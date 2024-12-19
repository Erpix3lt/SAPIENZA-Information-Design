<script>
  let description = "This is a description of the item";
  let vulnerabilityScore = 7.2;
  let coordinates = [27.45, 23.12];
  let formattedDate = new Date().toDateString();

</script>
<div>
  <p class="uppercase text-xl font-arialBlack text-gray-500">Currently viewing:</p>
  <div class="text-gray-400 font-bold">
    <p>{description}</p>
    <p>Vulnerability score: {vulnerabilityScore}</p>
    <p>Coordinates: {coordinates[0]}, {coordinates[1]}</p>
    <p>{formattedDate}</p>
  </div>

</div>