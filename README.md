# Epic7SimpleCalculator
A simple calculator for mobile-game Epic 7

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Epic 7 Simple Calculator</title>
  </head>
  <body>
	<div>
	<h1>亂速計算</h1>
		<label>一速</label>
		<input id="CharSpeedfirst" value="150" onchange="calcCRRandomPossibility()">
		<label>二速</label>
		<input id="CharSpeedsecond" value="150" onchange="calcCRRandomPossibility()">
		<label id="possibility">可能</label>
		<label>亂速</label>
	</div>
	
	<script src="scripts\calculatorFunctions.js"></script>
  </body>
</html>


