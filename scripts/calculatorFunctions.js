const elementName = {
	CRDiscorderPossibility: "possibility",
	HighestSecSpeed: "highestSecSpeed",
	LowestFirSpeed: "lowestFirSpeed",
	CharSpeedfirst: "CharSpeedfirst",
	CharSpeedsecond: "CharSpeedsecond",
	CharSpeedfirstSlider: "CharSpeedfirstSlider",
	CharSpeedsecondSlider: "CharSpeedsecondSlider",
	PercentValue1: "percentValue1",
	PercentValue2: "percentValue2",
	PercentValue3: "percentValue3",
	PercentValue4: "percentValue4",
	CritRate: "critRate",
	Speed: "speed",
	TotalValue: "TotalValue",
	GWMyFirstSpeedInput: "GWMyFirstSpeedInput",
}


function calcCRRandomPossibility(v1, v2){
	// let v1 = document.getElementById("CharSpeedfirst");
	// let v2 = document.getElementById("CharSpeedsecond");

	let firstspeed = Number(v1.value);
	let secondspeed = Number(v2.value);
	
	if(firstspeed != 0 && secondspeed != 0)
	{
		let temp = 0;
		temp = ((firstspeed / secondspeed)*0.95);//假設1速跑到100%要1秒，2速跑到100%需要幾秒, 若2速亂速初始+5%速攻條 跑到100%需要多久
		if (temp <= 1.0)//只要大於1速跑到100%所需的1秒，就有可能亂速
		{
			document.getElementById(elementName.CRDiscorderPossibility).innerHTML = "UnSafe";
			document.getElementById(elementName.CRDiscorderPossibility).style.color = "red";
		}
		else
		{
			document.getElementById(elementName.CRDiscorderPossibility).innerHTML = "Safe";
			document.getElementById(elementName.CRDiscorderPossibility).style.color = "#28FF28";
		}

		document.getElementById(elementName.HighestSecSpeed).innerHTML = (firstspeed*0.95).toFixed(2);
		document.getElementById(elementName.LowestFirSpeed).innerHTML = (secondspeed/0.95).toFixed(2);
	}
	else document.getElementById(elementName.CRDiscorderPossibility).innerHTML = "";
}

function speedInputTextChanged(){
	let v1 = document.getElementById(elementName.CharSpeedfirst);
	let v2 = document.getElementById(elementName.CharSpeedsecond);

	let s1 = document.getElementById(elementName.CharSpeedfirstSlider);
	let s2 = document.getElementById(elementName.CharSpeedsecondSlider);

	s1.value = Number(v1.value);
	s2.value = Number(v2.value);

	calcCRRandomPossibility(v1, v2);
}

function speedSliderValueChanged(){
	let v1 = document.getElementById(elementName.CharSpeedfirst);
	let v2 = document.getElementById(elementName.CharSpeedsecond);

	let s1 = document.getElementById(elementName.CharSpeedfirstSlider);
	let s2 = document.getElementById(elementName.CharSpeedsecondSlider);

	v1.value = s1.value;
	v2.value = s2.value;
	
	calcCRRandomPossibility(v1, v2);
}

function calcEffcientHP(hpID, defID, resultID){
	let v1 = Number(document.getElementById(hpID).value);
	let v2 = Number(document.getElementById(defID).value);

	document.getElementById(resultID).innerHTML = (v1*(v2/300+1)).toFixed(2);
}

function HPInputTextChanged(hpinput, hpsliderID, definputID, resultID){
	let s1 = document.getElementById(hpsliderID);

	s1.value = Number(hpinput.value);

	calcEffcientHP(hpsliderID, definputID, resultID);
}

function DefInputTextChanged(definput, defsliderID, hpinputID, resultID){
	let s1 = document.getElementById(defsliderID);

	s1.value = Number(definput.value);

	calcEffcientHP(hpinputID, defsliderID, resultID);
}

function HPSliderValueChanged(hpslider, hpinputID, definputID, resultID){
	let v1 = document.getElementById(hpinputID);

	v1.value = Number(hpslider.value);

	calcEffcientHP(hpinputID, definputID, resultID);
}

function DefSliderValueChanged(defslider, definputID, hpinputID, resultID){
	let v1 = document.getElementById(definputID);

	v1.value = Number(defslider.value);

	calcEffcientHP(hpinputID, definputID, resultID);
}


function calcEquipmentValue(){
	let p1 = Number(document.getElementById(elementName.PercentValue1).value);
	let p2 = Number(document.getElementById(elementName.PercentValue2).value);
	let p3 = Number(document.getElementById(elementName.PercentValue3).value);
	let p4 = Number(document.getElementById(elementName.PercentValue4).value);
	let v1 = Number(document.getElementById(elementName.CritRate).value);
	let v2 = Number(document.getElementById(elementName.Speed).value);

	let totalvalue = p1+p2+p3+p4+v1*1.5+v2*2;

	document.getElementById(elementName.TotalValue).innerHTML = totalvalue;
}

function resetEquipValue(){
	document.getElementById(elementName.PercentValue1).value = 0;
	document.getElementById(elementName.PercentValue2).value = 0;
	document.getElementById(elementName.PercentValue3).value = 0;
	document.getElementById(elementName.PercentValue4).value = 0;
	document.getElementById(elementName.CritRate).value = 0;
	document.getElementById(elementName.Speed).value = 0;

	calcEquipmentValue();
}

function GWMyFirstSpeedChanged(){
	let ele = document.getElementById("GWMyFirstSpeedInput");
	let res = document.getElementById("GWMyInfo");
	res.innerHTML = "我方一速" + Number(ele.value);
	
	let crpush = Number(document.getElementById("GWMyFirstSpeedCRPushInput").value);
	if(!Number.isNaN(crpush) && crpush !== 0){
		document.getElementById("crpushWarning").innerHTML = "有退拉條情況下計算結果不一定正確，請小心評估";
	}else
		document.getElementById("crpushWarning").innerHTML = "";
}

function calcGWCR(enCR){
	let mine = Number(document.getElementById("GWMyFirstSpeedInput").value);
	let crpush = Number(document.getElementById("GWMyFirstSpeedCRPushInput").value);
	let enemy = Number(document.getElementById(enCR).value);

	if(crpush === 0){
		let fastest = (mine * enemy/95).toFixed(2);
		let lowest = (mine * (enemy - 5)/100).toFixed(2);
		
		let res = lowest + "~" + fastest;
		return res;
	}else if(Number.isNaN(crpush)){
		return "??~??";
	}else if(crpush > 0){
		let fastest = (mine / ((enemy-crpush-5)/100)).toFixed(2);
		let lowest = (mine / ((enemy - crpush)/100) * 0.95).toFixed(2);
		
		let res = lowest + "~" + fastest;
		return res;
	}else if(crpush < 0){
		let fastest = (mine/((100-crpush-5)/100) * (enemy/100)).toFixed(2);
		let lowest = (mine/((100-crpush)/100) * ((enemy-5)/100)).toFixed(2);
		
		let res = lowest + "~" + fastest;
		return res;
	}
}

function GWFirstEnInfoChanged(){
	let charname = document.getElementById("GWEnFirstSpeedNameInput");
	let res = document.getElementById("GWFirstEnInfo");
	let hp = document.getElementById("GWEnFirstSpeedHPInput");
	let arti = document.getElementById("GWEnFirstSpeedArtiInput");
	let printName = (charname.value === "??" || charname.value === "");
	let printHP = Number.isNaN(Number(hp.value));
	let printArti = (arti.value === "??" || arti.value === "");

	let cb1 = document.getElementById("GWEnFirstSpeedImmuneCB");
	let cb2 = document.getElementById("GWEnFirstSpeedCounterCB");
	let cb3 = document.getElementById("GWEnFirstSpeedHighResCB");

	let speedRange = calcGWCR("GWEnFirstSpeedInput");

	res.innerHTML = "敵方" + (!printName?charname.value:"") + "一速" + speedRange + (!printHP?" 血量 " + hp.value:"") + (!printArti?" 神器 " + arti.value:" 神器未知 ") + (cb1.checked?" 免疫套":"") + (cb2.checked?" 反擊套":"") + (cb3.checked?" 高抗":"");
}

function GWSecondEnInfoChanged(){
	let charname = document.getElementById("GWEnSecondSpeedNameInput");
	let res = document.getElementById("GWSecondEnInfo");
	let hp = document.getElementById("GWEnSecondSpeedHPInput");
	let arti = document.getElementById("GWEnSecondSpeedArtiInput");
	let printName = (charname.value === "??" || charname.value === "");
	let printHP = Number.isNaN(Number(hp.value));
	let printArti = (arti.value === "??" || arti.value === "");

	
	let cb1 = document.getElementById("GWEnSecondSpeedImmuneCB");
	let cb2 = document.getElementById("GWEnSecondSpeedCounterCB");
	let cb3 = document.getElementById("GWEnSecondSpeedHighResCB");
	
	let speedRange = calcGWCR("GWEnSecondSpeedInput");

	res.innerHTML = "敵方" + (!printName?charname.value:"") + "二速" + speedRange + (!printHP?" 血量 " + hp.value:"") + (!printArti?" 神器 " + arti.value:" 神器未知 ") + (cb1.checked?" 免疫套":"") + (cb2.checked?" 反擊套":"") + (cb3.checked?" 高抗":"");
}

function GWThirdEnInfoChanged(){
	let charname = document.getElementById("GWEnThirdSpeedNameInput");
	let res = document.getElementById("GWThirdEnInfo");
	let hp = document.getElementById("GWEnThirdSpeedHPInput");
	let arti = document.getElementById("GWEnThirdSpeedArtiInput");
	let printName = (charname.value === "??" || charname.value === "");
	let printHP = Number.isNaN(Number(hp.value));
	let printArti = (arti.value === "??" || arti.value === "");

	
	let cb1 = document.getElementById("GWEnThirdSpeedImmuneCB");
	let cb2 = document.getElementById("GWEnThirdSpeedCounterCB");
	let cb3 = document.getElementById("GWEnThirdSpeedHighResCB");
	
	let speedRange = calcGWCR("GWEnThirdSpeedInput");

	res.innerHTML = "敵方" + (!printName?charname.value:"") + "三速" + speedRange + (!printHP?" 血量 " + hp.value:"") + (!printArti?" 神器 " + arti.value:" 神器未知 ") + (cb1.checked?" 免疫套":"") + (cb2.checked?" 反擊套":"") + (cb3.checked?" 高抗":"");
}

function GWCommentChanged(input){
	let res = document.getElementById("GWComment");

	res.innerHTML = input.value;
}

function resetGWValue(){
	document.getElementById("GWMyFirstSpeedInput").value = "270";
	document.getElementById("GWMyFirstSpeedCRPushInput").value = "0";
	document.getElementById("GWMyInfo").innerHTML = "";
	document.getElementById("crpushWarning").innerHTML = "";

	document.getElementById("GWEnFirstSpeedNameInput").value = "??";
	document.getElementById("GWFirstEnInfo").innerHTML = "";
	document.getElementById("GWEnFirstSpeedInput").value = "??";
	document.getElementById("GWEnFirstSpeedHPInput").value = "??";
	document.getElementById("GWEnFirstSpeedArtiInput").value = "??";
	document.getElementById("GWEnFirstSpeedImmuneCB").checked = false;
	document.getElementById("GWEnFirstSpeedCounterCB").checked = false;
	document.getElementById("GWEnFirstSpeedHighResCB").checked = false;

	document.getElementById("GWEnSecondSpeedNameInput").value = "??";
	document.getElementById("GWSecondEnInfo").innerHTML = "";
	document.getElementById("GWEnSecondSpeedInput").value = "??";
	document.getElementById("GWEnSecondSpeedHPInput").value = "??";
	document.getElementById("GWEnSecondSpeedArtiInput").value = "??";
	document.getElementById("GWEnSecondSpeedImmuneCB").checked = false;
	document.getElementById("GWEnSecondSpeedCounterCB").checked = false;
	document.getElementById("GWEnSecondSpeedHighResCB").checked = false;

	document.getElementById("GWEnThirdSpeedNameInput").value = "??";
	document.getElementById("GWThirdEnInfo").innerHTML = "";
	document.getElementById("GWEnThirdSpeedInput").value = "??";
	document.getElementById("GWEnThirdSpeedHPInput").value = "??";
	document.getElementById("GWEnThirdSpeedArtiInput").value = "??";
	document.getElementById("GWEnThirdSpeedImmuneCB").checked = false;
	document.getElementById("GWEnThirdSpeedCounterCB").checked = false;
	document.getElementById("GWEnThirdSpeedHighResCB").checked = false;
}

function afterLoaded(){
	calcEquipmentValue();
}