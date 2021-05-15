const elementName = {
	CRDiscorderPossibility: "#possibility",
	HighestSecSpeed: "#highestSecSpeed",
	LowestFirSpeed: "#lowestFirSpeed",
	CharSpeedfirst: "#CharSpeedfirst",
	CharSpeedsecond: "#CharSpeedsecond",
	CharSpeedfirstSlider: "#CharSpeedfirstSlider",
	CharSpeedsecondSlider: "#CharSpeedsecondSlider",

	CharSpeedfirst2: "#CharSpeedfirst2",
	CharSpeedsecond2: "#CharSpeedsecond2",
	CharSpeedthird2: "#CharSpeedthird2",
	CharSpeedfirstSlider2: "#CharSpeedfirstSlider2",
	CharSpeedsecondSlider2: "#CharSpeedsecondSlider2",
	CharSpeedthirdSlider2: "#CharSpeedthirdSlider2",
	firstSpeedhasCRRandom:"#firstSpeedhasCRRandom",
	secondSpeedhasCRRandom:"#secondSpeedhasCRRandom",
	thirdSpeedhasCRRandom:"#thirdSpeedhasCRRandom",
	hasSpeedBuff: "#hasSpeedBuff",
	hasSpeedDebuff: "#hasSpeedDebuff",
	hasCRPush: "#hasCRPush",
	thirdSpeedGotCRPush: "#thirdSpeedGotCRPush",
	canthirdspeedcutoff: "#canthirdspeedcutoff",
	howmuchsecondspeedcan:"#howmuchsecondspeedcan",
	howmuchthirdspeedcan: "#howmuchthirdspeedcan",

	PercentValue1: "#percentValue1",
	PercentValue2: "#percentValue2",
	PercentValue3: "#percentValue3",
	PercentValue4: "#percentValue4",
	CritRate: "#critRate",
	Speed: "#speed",
	HpFlat: "#hpflat",
	AtkFlat: "#atkflat",
	DefFlat: "#defflat",

	HpNoAwakenFlatLabel: "#heroHP",
	AtkNoAwakenFlatLabel: "#heroAtk",
	DefNoAwakenFlatLabel: "#heroDef",
	SpeedNoAwakenFlatLabel: "#heroSpeed",
	CritRateNoAwakenFlatLabel: "#heroCritRate",
	CritDmgNoAwakenFlatLabel: "#heroCritDmg",
	EffectnessNoAwakenFlatLabel: "#heroEffectness",
	EffResNoAwakenFlatLabel: "#heroEffRes",

	HpFullyAwakenFlatLabel: "#heroFAHP",
	AtkFullyAwakenFlatLabel: "#heroFAAtk",
	DefFullyAwakenFlatLabel: "#heroFADef",
	SpeedFullyAwakenFlatLabel: "#heroFASpeed",
	CritRateFullyAwakenFlatLabel: "#heroFACritRate",
	CritDmgFullyAwakenFlatLabel: "#heroFACritDmg",
	EffectnessFullyAwakenFlatLabel: "#heroFAEffectness",
	EffResFullyAwakenFlatLabel: "#heroFAEffRes",

	TargetATKValue: "#targetATKValue",
	TargetCritRateValue: "#targetCritRateValue",
	TargetCritDMGValue: "#targetCritDMGValue",
	TargetHPValue: "#targetHPValue",
	TargetDEFValue: "#targetDEFValue",
	TargetSpeedValue: "#targetSpeedValue",
	TargetEffectValue: "#targetEffectValue",
	TargetEffResValue: "#targetEffResValue",

	lv85needATKPercent: "#lv85needATKPercent",
	lv85needCritRate: "#lv85needCritRate",
	lv85needCritDMG: "#lv85needCritDMG",
	lv85needHPPercent: "#lv85needHPPercent",
	lv85needDEFPercent: "#lv85needDEFPercent",
	lv85needSpeed: "#lv85needSpeed",
	lv85needEffectness: "#lv85needEffectness",
	lv85needEffRes: "#lv85needEffRes",
	
	lv90needATKPercent: "#lv90needATKPercent",
	lv90needCritRate: "#lv90needCritRate",
	lv90needCritDMG: "#lv90needCritDMG",
	lv90needHPPercent: "#lv90needHPPercent",
	lv90needDEFPercent: "#lv90needDEFPercent",
	lv90needSpeed: "#lv90needSpeed",
	lv90needEffectness: "#lv90needEffectness",
	lv90needEffRes: "#lv90needEffRes",

	TotalValue: "#TotalValue",
	GWMyFirstSpeedInput: "#GWMyFirstSpeedInput",
}

const curLang = "zh";

const versionPrefix = "Version: Alpha v";
const versionText = "1.1";

const lv85ATkValue = 500;
const lv85HPValue = 2700;
const lv85DefValue = 300;
const lv85SpdValue = 40;
const lv90ATkValue = 525;
const lv90HPValue = 2835;
const lv90DefValue = 310;
const lv90SpdValue = 45;

tempHeroNameList = {};
tempHeroNameList[curLang] = {};

currentState = {};

function calcCRRandomPossibility(v1, v2){
	// let v1 = $("#CharSpeedfirst");
	// let v2 = $("#CharSpeedsecond");

	let firstspeed = Number(v1.val());
	let secondspeed = Number(v2.val());
	
	if(firstspeed != 0 && secondspeed != 0)
	{
		let temp = 0;
		temp = ((firstspeed / secondspeed)*0.95);//假設1速跑到100%要1秒，2速跑到100%需要幾秒, 若2速亂速初始+5%速攻條 跑到100%需要多久
		if (temp <= 1.0)//只要大於1速跑到100%所需的1秒，就有可能亂速
		{
			$(elementName.CRDiscorderPossibility).html("UnSafe");
			$(elementName.CRDiscorderPossibility).attr("style", "color: red");
		}
		else
		{
			$(elementName.CRDiscorderPossibility).html("Safe");
			$(elementName.CRDiscorderPossibility).attr("style", "color: #28FF28");
		}

		$(elementName.HighestSecSpeed).html((firstspeed * 0.95).toFixed(2));
		$(elementName.LowestFirSpeed).html((secondspeed / 0.95).toFixed(2));
	}
	else $(elementName.CRDiscorderPossibility).html("");
}

function speedInputTextChanged(){
	let v1 = $(elementName.CharSpeedfirst);
	let v2 = $(elementName.CharSpeedsecond);

	let s1 = $(elementName.CharSpeedfirstSlider);
	let s2 = $(elementName.CharSpeedsecondSlider);

	s1.val(Number(v1.val()));
	s2.val(Number(v2.val()));

	calcCRRandomPossibility(v1, v2);
}

function speedSliderValueChanged(){
	let v1 = $(elementName.CharSpeedfirst);
	let v2 = $(elementName.CharSpeedsecond);

	let s1 = $(elementName.CharSpeedfirstSlider);
	let s2 = $(elementName.CharSpeedsecondSlider);

	v1.val(s1.val());
	v2.val(s2.val());
	
	calcCRRandomPossibility(v1, v2);
}

function advancedCRCalc(){
	// let v1 = $(elementName.CharSpeedfirst2);
	// let v2 = $(elementName.CharSpeedsecond2);
	// let v3 = $(elementName.CharSpeedthird2);

	let x = Number($(elementName.CharSpeedfirst2).val());//x
	let z = Number($(elementName.CharSpeedsecond2).val());//z
	let y = Number($(elementName.CharSpeedthird2).val());//y

	let FShasCRRandom = $(elementName.firstSpeedhasCRRandom).is(":checked");
	let SShasCRRandom = $(elementName.secondSpeedhasCRRandom).is(":checked");
	let TShasCRRandom = $(elementName.thirdSpeedhasCRRandom).is(":checked");
	
	let TShasSpeedBuff = $(elementName.hasSpeedBuff).is(":checked");
	let TShasSpeedDebuff = $(elementName.hasSpeedDebuff).is(":checked");
	let TShasCRPush = $(elementName.hasCRPush).is(":checked");
	let TShasCRPushValue = (Number($(elementName.thirdSpeedGotCRPush).val())/100).toFixed(2);
	
	let thirdtotalhaspush = TShasCRPush?TShasCRPushValue:0;

	let FSCRRandom = FShasCRRandom?0.95:1;//x亂
	let SSCRPercent = 1-(SShasCRRandom?0.05:0);//z亂
	let TSCRPercent = 1-(TShasCRRandom?0.05:0)-thirdtotalhaspush;//y亂
	let thirdtotalspeedup = 1+(TShasSpeedBuff?0.3:0) + (TShasSpeedDebuff?(-0.3):0);//y加

	if(!x && !y && !z)
	{
		alert("不可三個速度皆為空");
		return;
	}else if(!x){
		alert("無一速數值你在這邊想算什麼？");
		return;
	}
	
	if(x && y){
		//計算二速公式，目的：已知一三速，則二速只要小於此計算值，三速就可以超車
		//z < x*z亂/(x亂*(1-1/y加)+(y亂/y加)*(x/y))
		let secondspeedMaxValue = (x*SSCRPercent) / (FSCRRandom*(1-(1/thirdtotalspeedup)) + ((x/y)*(TSCRPercent/thirdtotalspeedup)));
		$(elementName.howmuchsecondspeedcan).html(`二速低於${secondspeedMaxValue.toFixed(2)}，三速就可以超車`);
	}
	
	if(x && z){
		//計算三速公式，目的：已知一二速，則三速大於此計算值就可超車二速
		//y > (y亂*x/y加)/(z亂*x/z - x亂*(1-1/y加))
		let thirdspeedMinValue = (TSCRPercent*x/thirdtotalspeedup)/(SSCRPercent*x/z - FSCRRandom*(1-1/thirdtotalspeedup));
		$(elementName.howmuchthirdspeedcan).html(`三速高於${thirdspeedMinValue.toFixed(2)}，就可以超車二速`);
	}
	
	if(x && y && z){
		if(thirdtotalhaspush !== 0)
		{
			let isthirdgotpushoveronehundred = (1-(TShasCRRandom?0.05:0)-y/x*(FShasCRRandom?0.95:1))-thirdtotalhaspush;
			if(isthirdgotpushoveronehundred < 0)
				{
					$(elementName.canthirdspeedcutoff).html("三速可以超車二速")
					$(elementName.canthirdspeedcutoff).attr("style", "color: green");
					return;
				}
		}
		
		//驗證三速超車二速公式，目的：一二三速已知情況下，三速能否超車對手
		//x亂*(1-1/y加) < x*(z亂/z-y亂/(y加*y))
		let thirdcanoversecond = ((FSCRRandom*(1-1/thirdtotalspeedup)) < (x*(SSCRPercent/z-TSCRPercent/(thirdtotalspeedup*y))));

		if(thirdcanoversecond){
			$(elementName.canthirdspeedcutoff).html("三速可以超車二速")
			$(elementName.canthirdspeedcutoff).attr("style", "color: green");
		}else{
			$(elementName.canthirdspeedcutoff).html("三速無法超車二速")
			$(elementName.canthirdspeedcutoff).attr("style", "color: red");
		}
	}
}

function speedInputTextChanged2(){
	let v1 = $(elementName.CharSpeedfirst2);
	let v2 = $(elementName.CharSpeedsecond2);
	let v3 = $(elementName.CharSpeedthird2);

	let s1 = $(elementName.CharSpeedfirstSlider2);
	let s2 = $(elementName.CharSpeedsecondSlider2);
	let s3 = $(elementName.CharSpeedthirdSlider2);

	s1.val(Number(v1.val()));
	s2.val(Number(v2.val()));
	s3.val(Number(v3.val()));
}

function speedSliderValueChanged2(){
	let v1 = $(elementName.CharSpeedfirst2);
	let v2 = $(elementName.CharSpeedsecond2);
	let v3 = $(elementName.CharSpeedthird2);

	let s1 = $(elementName.CharSpeedfirstSlider2);
	let s2 = $(elementName.CharSpeedsecondSlider2);
	let s3 = $(elementName.CharSpeedthirdSlider2);

	v1.val(s1.val());
	v2.val(s2.val());
	v3.val(s3.val());
}

function calcEffcientHP(hpID, defID, resultID){
	let v1 = Number($(`#${hpID}`).val());
	let v2 = Number($(`#${defID}`).val());

	$(`#${resultID}`).html((v1*(v2/300+1)).toFixed(2));
}

function HPInputTextChanged(hpinput, hpsliderID, definputID, resultID){
	let s1 = $(`#${hpsliderID}`);

	s1.val(Number(hpinput.value));

	calcEffcientHP(hpsliderID, definputID, resultID);
}

function DefInputTextChanged(definput, defsliderID, hpinputID, resultID){
	let s1 = $(`#${defsliderID}`);

	s1.val(Number(definput.value));

	calcEffcientHP(hpinputID, defsliderID, resultID);
}

function HPSliderValueChanged(hpslider, hpinputID, definputID, resultID){
	let v1 = $(`#${hpinputID}`);

	v1.val(Number(hpslider.value));

	calcEffcientHP(hpinputID, definputID, resultID);
}

function DefSliderValueChanged(defslider, definputID, hpinputID, resultID){
	let v1 = $(`#${definputID}`);

	v1.val(Number(defslider.value));

	calcEffcientHP(hpinputID, definputID, resultID);
}


function calcEquipmentValue(){
	let p1 = Number($(elementName.PercentValue1).val());
	let p2 = Number($(elementName.PercentValue2).val());
	let p3 = Number($(elementName.PercentValue3).val());
	let p4 = Number($(elementName.PercentValue4).val());
	let v1 = Number($(elementName.CritRate).val());
	let v2 = Number($(elementName.Speed).val());

	let v3 = Number($(elementName.HpFlat).val());
	let v4 = Number($(elementName.AtkFlat).val());
	let v5 = Number($(elementName.DefFlat).val());

	let hpflatvalue = Number($(elementName.HpFullyAwakenFlatLabel).html());
	let atkflatvalue = Number($(elementName.AtkFullyAwakenFlatLabel).html());
	let defflatvalue = Number($(elementName.DefFullyAwakenFlatLabel).html());

	v3 = Number(hpflatvalue === 0? 0: (v3 / hpflatvalue * 100).toFixed(2));
	v4 = Number(atkflatvalue === 0? 0: (v4 / atkflatvalue * 100).toFixed(2));
	v5 = Number(defflatvalue === 0? 0: (v5 / defflatvalue * 100).toFixed(2));

	let totalvalue = p1 + p2 + p3 + p4 + v1 * 1.5 + v2 * 2 + v3 + v4 + v5;

	$(elementName.TotalValue).html(totalvalue.toFixed(2));
}

function resetEquipValue(){
	$(elementName.PercentValue1).val(0);
	$(elementName.PercentValue2).val(0);
	$(elementName.PercentValue3).val(0);
	$(elementName.PercentValue4).val(0);
	$(elementName.CritRate).val(0);
	$(elementName.Speed).val(0);
	$(elementName.HpFlat).val(0);
	$(elementName.AtkFlat).val(0);
	$(elementName.DefFlat).val(0);

	calcEquipmentValue();
}

function GWMyFirstSpeedChanged(){
	let ele = $("#GWMyFirstSpeedInput");
	let res = $("#GWMyInfo");
	res.html("我方一速" + Number(ele.val()));
	
	let crpush = Number($("#GWMyFirstSpeedCRPushInput").val());
	if(!Number.isNaN(crpush) && crpush !== 0){
		$("#crpushWarning").html("有退拉條情況下計算結果不一定正確，請小心評估");
	}else
		$("#crpushWarning").html("");
	if(!Number.isNaN(Number($(`#GWEnFirstSpeedInput`).val())))
		GWFirstEnInfoChanged();
	if(!Number.isNaN(Number($(`#GWEnSecondSpeedInput`).val())))
		GWSecondEnInfoChanged();
	if(!Number.isNaN(Number($(`#GWEnThirdSpeedInput`).val())))
		GWThirdEnInfoChanged();
}

function calcGWCR(enCR){
	let mine = Number($("#GWMyFirstSpeedInput").val());
	let crpush = Number($("#GWMyFirstSpeedCRPushInput").val());
	let enemy = Number($(`#${enCR}`).val());
	
	if(Number.isNaN(crpush)){
		return "??~??";
	}else if(crpush === 0){
		let fastest = (mine * enemy/95).toFixed(2);
		let lowest = (mine * enemy/100).toFixed(2);
		
		let res = lowest + "~" + fastest;
		return res;
	}else if(crpush > 0){
		let fastest = ( (mine / ((100 - crpush) / 100)) / ((enemy - 5) / 100)).toFixed(2);
		let lowest = ( (mine / ((100 - crpush) / 100)) / (enemy / 100)).toFixed(2);
		
		let res = lowest + "~" + fastest;
		return res;
	}else if(crpush < 0){
		let fastest = ((mine / ((100 - crpush) / 100)) * (enemy / 100)).toFixed(2);
		let lowest = ((mine / ((100 - crpush) / 100)) * ((enemy - 5) / 100)).toFixed(2);
		
		let res = lowest + "~" + fastest;
		return res;
	}
}

function GWFirstEnInfoChanged(){
	let charname = $("#GWEnFirstSpeedNameInput");
	let res = $("#GWFirstEnInfo");
	let hp = $("#GWEnFirstSpeedHPInput");
	let arti = $("#GWEnFirstSpeedArtiInput");
	let printName = (charname.val() === "??" || charname.val() === "");
	let printHP = Number.isNaN(Number(hp.val()));
	let printArti = (arti.val() === "??" || arti.val() === "");

	let cb1 = $("#GWEnFirstSpeedImmuneCB");
	let cb2 = $("#GWEnFirstSpeedCounterCB");
	let cb3 = $("#GWEnFirstSpeedHighResCB");

	let speedRange = calcGWCR("GWEnFirstSpeedInput");

	res.html("敵方" + (!printName?charname.val():"") + "一速" + speedRange + (!printHP?" 血量 " + hp.val():"") + (!printArti?" 神器 " + arti.val():" 神器未知 ") + (cb1.checked?" 免疫套":"") + (cb2.checked?" 反擊套":"") + (cb3.checked?" 高抗":""));
}

function GWSecondEnInfoChanged(){
	let charname = $("#GWEnSecondSpeedNameInput");
	let res = $("#GWSecondEnInfo");
	let hp = $("#GWEnSecondSpeedHPInput");
	let arti = $("#GWEnSecondSpeedArtiInput");
	let printName = (charname.val() === "??" || charname.val() === "");
	let printHP = Number.isNaN(Number(hp.val()));
	let printArti = (arti.val() === "??" || arti.val() === "");

	
	let cb1 = $("#GWEnSecondSpeedImmuneCB");
	let cb2 = $("#GWEnSecondSpeedCounterCB");
	let cb3 = $("#GWEnSecondSpeedHighResCB");
	
	let speedRange = calcGWCR("GWEnSecondSpeedInput");

	res.html("敵方" + (!printName?charname.val():"") + "二速" + speedRange + (!printHP?" 血量 " + hp.val():"") + (!printArti?" 神器 " + arti.val():" 神器未知 ") + (cb1.checked?" 免疫套":"") + (cb2.checked?" 反擊套":"") + (cb3.checked?" 高抗":""));
}

function GWThirdEnInfoChanged(){
	let charname = $("#GWEnThirdSpeedNameInput");
	let res = $("#GWThirdEnInfo");
	let hp = $("#GWEnThirdSpeedHPInput");
	let arti = $("#GWEnThirdSpeedArtiInput");
	let printName = (charname.val() === "??" || charname.val() === "");
	let printHP = Number.isNaN(Number(hp.val()));
	let printArti = (arti.val() === "??" || arti.val() === "");

	
	let cb1 = $("#GWEnThirdSpeedImmuneCB");
	let cb2 = $("#GWEnThirdSpeedCounterCB");
	let cb3 = $("#GWEnThirdSpeedHighResCB");
	
	let speedRange = calcGWCR("GWEnThirdSpeedInput");

	res.html("敵方" + (!printName?charname.val():"") + "三速" + speedRange + (!printHP?" 血量 " + hp.val():"") + (!printArti?" 神器 " + arti.val():" 神器未知 ") + (cb1.checked?" 免疫套":"") + (cb2.checked?" 反擊套":"") + (cb3.checked?" 高抗":""));
}

function GWCommentChanged(input){
	let res = $("#GWComment");

	res.html(input.val());
}

function resetGWValue(){
	$("#GWMyFirstSpeedInput").val("270");
	$("#GWMyFirstSpeedCRPushInput").val("0");
	$("#GWMyInfo").html("");
	$("#crpushWarning").html("");

	$("#GWEnFirstSpeedNameInput").val("??");
	$("#GWFirstEnInfo").html("");
	$("#GWEnFirstSpeedInput").val("??");
	$("#GWEnFirstSpeedHPInput").val("??");
	$("#GWEnFirstSpeedArtiInput").val("??");
	$("#GWEnFirstSpeedImmuneCB").checked = false;
	$("#GWEnFirstSpeedCounterCB").checked = false;
	$("#GWEnFirstSpeedHighResCB").checked = false;

	$("#GWEnSecondSpeedNameInput").val("??");
	$("#GWSecondEnInfo").html("");
	$("#GWEnSecondSpeedInput").val("??");
	$("#GWEnSecondSpeedHPInput").val("??");
	$("#GWEnSecondSpeedArtiInput").val("??");
	$("#GWEnSecondSpeedImmuneCB").checked = false;
	$("#GWEnSecondSpeedCounterCB").checked = false;
	$("#GWEnSecondSpeedHighResCB").checked = false;

	$("#GWEnThirdSpeedNameInput").val("??");
	$("#GWThirdEnInfo").html("");
	$("#GWEnThirdSpeedInput").val("??");
	$("#GWEnThirdSpeedHPInput").val("??");
	$("#GWEnThirdSpeedArtiInput").val("??");
	$("#GWEnThirdSpeedImmuneCB").checked = false;
	$("#GWEnThirdSpeedCounterCB").checked = false;
	$("#GWEnThirdSpeedHighResCB").checked = false;
}

function afterLoaded(){
	$('#version').html(versionPrefix + versionText);

	calcEquipmentValue();

	$.ajax({
		url: "https://api.epicsevendb.com/hero",
		success: (response) => {
		  heronamelistRes(response.results);
		}
	  })
}

function heroNoAwakenStatRes(statRes){
	// console.log(statRes);
	$(elementName.HpNoAwakenFlatLabel).html(statRes.hp);
	$(elementName.AtkNoAwakenFlatLabel).html(statRes.atk);
	$(elementName.DefNoAwakenFlatLabel).html(statRes.def);
	$(elementName.SpeedNoAwakenFlatLabel).html(statRes.spd);
	$(elementName.CritRateNoAwakenFlatLabel).html(`${(statRes.chc * 100).toFixed(2)}%`);
	$(elementName.CritDmgNoAwakenFlatLabel).html(`${(statRes.chd * 100).toFixed(2)}%`);
	$(elementName.EffectnessNoAwakenFlatLabel).html(`${(statRes.eff * 100).toFixed(2)}%`);
	$(elementName.EffResNoAwakenFlatLabel).html(`${(statRes.efr * 100).toFixed(2)}%`);

	calcEquipmentValue();
}

function heroFullyAwakenStatRes(statRes){
	// console.log(statRes);
	$(elementName.HpFullyAwakenFlatLabel).html(statRes.hp);
	$(elementName.AtkFullyAwakenFlatLabel).html(statRes.atk);
	$(elementName.DefFullyAwakenFlatLabel).html(statRes.def);
	$(elementName.SpeedFullyAwakenFlatLabel).html(statRes.spd);
	$(elementName.CritRateFullyAwakenFlatLabel).html(`${(statRes.chc * 100).toFixed(2)}%`);
	$(elementName.CritDmgFullyAwakenFlatLabel).html(`${(statRes.chd * 100).toFixed(2)}%`);
	$(elementName.EffectnessFullyAwakenFlatLabel).html(`${(statRes.eff * 100).toFixed(2)}%`);
	$(elementName.EffResFullyAwakenFlatLabel).html(`${(statRes.efr * 100).toFixed(2)}%`);

	calcEquipmentValue();
}

function calcEquipmentNeedValue(){
	if(currentState === {}) return;

	let targetATK = $(elementName.TargetATKValue).val();
	let targetCR = $(elementName.TargetCritRateValue).val();
	let targetCDMG = $(elementName.TargetCritDMGValue).val();
	let targetHP = $(elementName.TargetHPValue).val();
	let targetDEF = $(elementName.TargetDEFValue).val();
	let targetSpd = $(elementName.TargetSpeedValue).val();
	let targetEff = $(elementName.TargetEffectValue).val();
	let targetEffRes = $(elementName.TargetEffResValue).val();

	//lv85
	let equip85Atk = ((targetATK < (currentState.atk + lv85ATkValue)))? 0:(((targetATK - lv85ATkValue)/currentState.atk - 1) * 100).toFixed(2);
	let equip85HP = ((targetHP < (currentState.hp + lv85HPValue)))? 0:(((targetHP - lv85HPValue)/currentState.hp - 1) * 100).toFixed(2);
	let equip85DEF = ((targetDEF < (currentState.def + lv85DefValue)))? 0:(((targetDEF - lv85DefValue)/currentState.def - 1) * 100).toFixed(2);
	let equip85Spd = targetSpd < currentState.spd? 0:(targetSpd - currentState.spd);
	let equip85CR = targetCR < currentState.chc? 0:(targetCR - currentState.chc * 100).toFixed(2);
	let equip85CDMG = targetCDMG < currentState.chd? 0:(targetCDMG - currentState.chd * 100).toFixed(2);
	let equip85Eff = targetEff < currentState.eff? 0:(targetEff - currentState.eff * 100).toFixed(2);
	let equip85EffRes = targetEffRes < currentState.efr? 0:(targetEffRes - currentState.efr * 100).toFixed(2);

	$(elementName.lv85needATKPercent).html(`${equip85Atk}%`);
	$(elementName.lv85needCritRate).html(`${equip85CR}%`);
	$(elementName.lv85needCritDMG).html(`${equip85CDMG}%`);
	$(elementName.lv85needHPPercent).html(`${equip85HP}%`);
	$(elementName.lv85needDEFPercent).html(`${equip85DEF}%`);
	$(elementName.lv85needSpeed).html(`${equip85Spd}`);
	$(elementName.lv85needEffectness).html(`${equip85Eff}%`);
	$(elementName.lv85needEffRes).html(`${equip85EffRes}%`);
	
	//lv90
	let equip90Atk = ((targetATK < (currentState.atk + lv90ATkValue)))? 0:(((targetATK - lv90ATkValue)/currentState.atk - 1) * 100).toFixed(2);
	let equip90HP = ((targetHP < (currentState.hp + lv90HPValue)))? 0:(((targetHP - lv90HPValue)/currentState.hp - 1) * 100).toFixed(2);
	let equip90DEF = ((targetDEF < (currentState.def + lv90DefValue)))? 0:(((targetDEF - lv90DefValue)/currentState.def - 1) * 100).toFixed(2);
	let equip90Spd = targetSpd < currentState.spd? 0:(targetSpd - currentState.spd);
	let equip90CR = targetCR < currentState.chc? 0:(targetCR - currentState.chc * 100).toFixed(2);
	let equip90CDMG = targetCDMG < currentState.chd? 0:(targetCDMG - currentState.chd * 100).toFixed(2);
	let equip90Eff = targetEff < currentState.eff? 0:(targetEff - currentState.eff * 100).toFixed(2);
	let equip90EffRes = targetEffRes < currentState.efr? 0:(targetEffRes - currentState.efr*100).toFixed(2);

	$(elementName.lv90needATKPercent).html(`${equip90Atk}%`);
	$(elementName.lv90needCritRate).html(`${equip90CR}%`);
	$(elementName.lv90needCritDMG).html(`${equip90CDMG}%`);
	$(elementName.lv90needHPPercent).html(`${equip90HP}%`);
	$(elementName.lv90needDEFPercent).html(`${equip90DEF}%`);
	$(elementName.lv90needSpeed).html(`${equip90Spd}`);
	$(elementName.lv90needEffectness).html(`${equip90Eff}%`);
	$(elementName.lv90needEffRes).html(`${equip90EffRes}%`);
}

function resetEquipNeedValue(){
	$(elementName.TargetATKValue).val(0);
	$(elementName.TargetCritRateValue).val(0);
	$(elementName.TargetCritDMGValue).val(0);
	$(elementName.TargetHPValue).val(0);
	$(elementName.TargetDEFValue).val(0);
	$(elementName.TargetSpeedValue).val(0);
	$(elementName.TargetEffectValue).val(0);
	$(elementName.TargetEffResValue).val(0);

	calcEquipmentNeedValue();
}

function getHeroStat(element){
	let heroname = tempHeroNameList[curLang][element.value]?tempHeroNameList[curLang][element.value]:element.value;
	// $("#heronameInput").val(lang_HeroName[curLang][element.value]);
	if(heroname !== "nulloption"){
		$.ajax({
			url: "https://api.epicsevendb.com/hero/"+heroname,
			success: (response) => {
				currentState = response.results[0].calculatedStatus.lv60SixStarFullyAwakened;
				heroNoAwakenStatRes(response.results[0].calculatedStatus.lv60SixStarNoAwaken);
				heroFullyAwakenStatRes(response.results[0].calculatedStatus.lv60SixStarFullyAwakened);
			}
		});
	}else{
		currentState = {};
		let obj = {};
		obj.hp = 0;
		obj.atk = 0;
		obj.def = 0;
		obj.spd = 0;
		obj.chc = 0;
		obj.chd = 0;
		obj.eff = 0;
		obj.efr = 0;
		heroNoAwakenStatRes(obj);
	}
}


function heronamelistRes(herolist){
	let dropdownmenu = $("#heronameList");
	let nulloption = $('<option/>').attr("value", "nulloption").html("無");
	dropdownmenu.append(nulloption);

	herolist.forEach(element => {
		tempHeroNameList[curLang][lang_HeroName[curLang][element._id]] = element._id;
		let option = $('<option/>').attr("id", element._id).attr("value", lang_HeroName[curLang][element._id]?lang_HeroName[curLang][element._id]:element._id).html(lang_HeroName[curLang][element._id]?lang_HeroName[curLang][element._id]:element._id);//new Option(element._id, element._id);
		dropdownmenu.append(option);
	});
	// console.log(dropdownmenu);
}