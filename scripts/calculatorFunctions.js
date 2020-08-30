const elementName = {
	CRDiscorderPossibility: "#possibility",
	HighestSecSpeed: "#highestSecSpeed",
	LowestFirSpeed: "#lowestFirSpeed",
	CharSpeedfirst: "#CharSpeedfirst",
	CharSpeedsecond: "#CharSpeedsecond",
	CharSpeedfirstSlider: "#CharSpeedfirstSlider",
	CharSpeedsecondSlider: "#CharSpeedsecondSlider",
	PercentValue1: "#percentValue1",
	PercentValue2: "#percentValue2",
	PercentValue3: "#percentValue3",
	PercentValue4: "#percentValue4",
	CritRate: "#critRate",
	Speed: "#speed",
	HpFlat: "#hpflat",
	AtkFlat: "#atkflat",
	DefFlat: "#defflat",
	HpFlatLabel: "#heroHP",
	AtkFlatLabel: "#heroAtk",
	DefFlatLabel: "#heroDef",
	TotalValue: "#TotalValue",
	GWMyFirstSpeedInput: "#GWMyFirstSpeedInput",
}

const versionPrefix = "Version: Alpha v";
const versionText = "1.1";

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
			$(elementName.CRDiscorderPossibility).style.color = "red";
		}
		else
		{
			$(elementName.CRDiscorderPossibility).html("Safe");
			$(elementName.CRDiscorderPossibility).style.color = "#28FF28";
		}

		$(elementName.HighestSecSpeed).html((firstspeed*0.95).toFixed(2));
		$(elementName.LowestFirSpeed).html((secondspeed/0.95).toFixed(2));
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

	let hpflatvalue = Number($(elementName.HpFlatLabel).html());
	let atkflatvalue = Number($(elementName.AtkFlatLabel).html());
	let defflatvalue = Number($(elementName.DefFlatLabel).html());

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
}

function calcGWCR(enCR){
	let mine = Number($("#GWMyFirstSpeedInput").val());
	let crpush = Number($("#GWMyFirstSpeedCRPushInput").val());
	let enemy = Number($(`#${enCR}`).val());

	if(crpush === 0){
		let fastest = (mine * enemy/95).toFixed(2);
		let lowest = (mine * enemy/100).toFixed(2);
		
		let res = lowest + "~" + fastest;
		return res;
	}else if(Number.isNaN(crpush)){
		return "??~??";
	}else if(crpush > 0){
		let fastest = (mine / ((enemy - crpush - 5) / 100)).toFixed(2);
		let lowest = (mine / ((enemy - crpush) / 100)).toFixed(2);
		
		let res = lowest + "~" + fastest;
		return res;
	}else if(crpush < 0){
		let fastest = (mine / ((100 - crpush - 5) / 100) * (enemy / 100)).toFixed(2);
		let lowest = (mine / ((100 - crpush) / 100) * ((enemy) / 100)).toFixed(2);
		
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

function heroStatRes(statRes){
	// console.log(statRes);
	$(elementName.HpFlatLabel).html(statRes.hp);
	$(elementName.AtkFlatLabel).html(statRes.atk);
	$(elementName.DefFlatLabel).html(statRes.def);

	calcEquipmentValue();
}

function getHeroStat(element){
	let heroname = element.value;
	if(heroname !== "nulloption"){
		$.ajax({
			url: "https://api.epicsevendb.com/hero/"+heroname,
			success: (response) => {
				//console.log(response.results[0].calculatedStatus.lv60SixStarNoAwaken);
				heroStatRes(response.results[0].calculatedStatus.lv60SixStarNoAwaken);
			}
		});
	}
}


function heronamelistRes(herolist){
	let dropdownmenu = $("#heronameList");
	let nulloption = $('<option/>').attr("value", "nulloption").html("無");
	dropdownmenu.append(nulloption);

	herolist.forEach(element => {
		let option = $('<option/>').attr("id", element._id).attr("value", element._id).html(element.name);//new Option(element._id, element._id);
		option.on("click", function(event) { 
			getHeroStat(element._id);
	   } );
		dropdownmenu.append(option);
	});
}