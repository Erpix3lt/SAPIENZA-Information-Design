import { JSDOM } from 'jsdom';


type Vulnerability = {
  id: string;
  name: string;
  description: string;
  status: string;
  severity: string;
};

export async function GET({ params }): Promise<Response> {
  const page = params.page;
  const ecosystem = params.ecosystem;

  // Log the two slugs
  console.log('page:', page);
  console.log('ecosystem:', ecosystem);
  
  const url = `https://osv.dev/list?q=&ecosystem=${ecosystem}`;
  const response = await fetch(url);

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data from the specified URL.' }),
      { status: 500 }
    );
  }

  const html = await response.text();
  console.log(html);
  // Parse the HTML using JSDOM
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Extract vulnerability data
  const rows = document.querySelectorAll('.vuln-table-row');
  const vulnerabilityReport: Vulnerability[] = [];

  rows.forEach(row => {
    const id = row.querySelector('a[href^="/vulnerability/"]')?.textContent?.trim() ?? '';
    const name = row.querySelector('.vuln-packages li')?.textContent?.trim() ?? '';
    const description = row.querySelector('.vuln-summary')?.textContent?.trim() ?? '';
    const dateElement = row.querySelector('relative-time');
    const date = dateElement ? dateElement.getAttribute('datetime') : null;
    const status = row.querySelector('.tag.fix-available')?.textContent?.trim() ?? '';
    const severity = row.querySelector('.tag.severity-low, .tag.severity-medium, .tag.severity-high')?.textContent?.trim() ?? '';

    if (id && name && description && date && status && severity) {
      vulnerabilityReport.push({
        id,
        name,
        description: `${description} ${new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}`,
        status,
        severity: severity.replace('Severity - ', '').trim(),
      });
    }
  });

  return new Response(JSON.stringify({ vulnerabilityReport }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

