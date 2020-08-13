function calcCRRandomPossibility(){
	let v1 = document.getElementById("CharSpeedfirst");
	let v2 = document.getElementById("CharSpeedsecond");

	let firstspeed = Number(v1.value);console.log("1st speed:"+firstspeed);
	let secondspeed = Number(v2.value);console.log("2nd speed:"+secondspeed);

	let temp1 = 0;
	let temp2 = 0;

	if(firstspeed != 0 && secondspeed != 0)
	{
		temp1 = firstspeed / secondspeed;//假設1速跑到100%要1秒，2速跑到100%需要幾秒
		console.log(temp1);
		temp2 = temp1 * 0.95;//若2速亂速初始+5%速攻條 跑到100%需要多久
		console.log(temp2);
		if (temp2 < 1.0)//只要大於1速跑到100%所需的1秒，就有可能亂速
			document.getElementById("possibility").innerHTML = "可能";
		else
			document.getElementById("possibility").innerHTML = "不可能";
	}
	else document.getElementById("possibility").innerHTML = "";
}