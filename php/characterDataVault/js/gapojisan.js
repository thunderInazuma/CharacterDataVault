var GapOjisanTRPG = function() {
	this.CharacterData = new CharacterData();
	this.CharacterData
	.setSystemData({
		gapOjisan : {
			systemName : "ギャップおじさんTRPG",
			mainSkillData : {
				aboutSkillName : "異能",
				gapPattern : this.CharacterData.getGapPattern("A_E"),
				headerSkillNameArray : [ "組織", "技術", "武芸", "魔術", "肉体", "怪物" ],
				skillNameArrayA : [ "裏切り", "スパイ", "権力", "国家", "護衛", "装備",
						"代替", "人員", "部隊", "精鋭", "勧誘" ],
				skillNameArrayB : [ "秘匿", "盗聴", "虚偽", "調達", "擬態", "隠れる",
						"遮蔽", "罠", "誘導", "狙撃", "破壊" ],
				skillNameArrayC : [ "乗馬", "目線", "観音", "心理", "読み", "体捌き",
						"無刀", "当身", "投げ", "振り", "斬り" ],
				skillNameArrayD : [ "予知", "類感", "感染", "交霊術", "憑依", "防壁",
						"召喚", "命令", "力場", "光弾", "天候" ],
				skillNameArrayE : [ "超感覚", "超視覚", "超暗視", "超聴覚", "超軟体",
						"超剛体", "超脚力", "超握力", "超腕力", "超反射", "超回復" ],
				skillNameArrayF : [ "幽体", "複眼", "超音波", "変色", "皮",
						"鱗", "翼", "触手", "爪", "牙", "不死" ],
				specialCellHedder : [ "調査", "防御", "攻撃" ],
			},
			anySkillData : [
					{
						anySkillTableId : "nitijou",
						anySkillTableName : "日常表",
						numberRow : "front",
						anySkillData : [
								{
									anySkillId : "gaiken",
									anySkillName : "外見",
									anySkillArray : [ "初老", "チビ", "恵体",
											"細身", "短髪", "不精", "長髪", "ラフ",
											"スーツ", "眼鏡", "一昔前" ]
								},
								{
									anySkillId : "seikaku",
									anySkillName : "性格",
									anySkillArray : [ "短気", "神経質", "弱気",
											"ケチ", "口下手", "オタク", "おしゃべり",
											"浪費家", "高慢", "大雑把", "のんびり" ]
								},
								{
									anySkillId : "ketten",
									anySkillName : "欠点",
									anySkillArray : [ "赤貧", "中毒", "無職",
											"孤独", "病弱", "窓際", "マッスル", "既婚",
											"平社員", "小金持ち", "成金" ]
								}, ]
					},
					{
						anySkillTableId : "yoridokoroHyo",
						anySkillTableName : "拠所表",
						numberRow : "back",
						anySkillData : [
								{
									anySkillId : "yoridokoro",
									anySkillName : "拠所",
									anySkillArray : [ "嗜好品", "敗北", "ゲーム",
											"運動", "労働", "学問", "創作", "育成",
											"異性", "勝利", "金銭" ]
								},
								{
									anySkillId : "jou",
									anySkillName : "情",
									anySkillArray : [ "友情", "憐憫", "庇護",
											"競争", "尊敬", "侮蔑", "悔恨", "探求",
											"信仰", "共感", "愛情" ]
								},
								{
									anySkillId : "kankei",
									anySkillName : "関係",
									anySkillArray : [ "家族", "友人", "恋心",
											"同僚", "先達", "後輩", "親", "幼子",
											"保護者", "戦友", "同好" ]
								}, ]
					}, ],
			anotherTable : {
				tableId : "skillList",
				tableName : "スキルリスト",
				defaultRow : 5,
				tableData : [ {
					rowId : "name",
					rowName : "名称",
					style : {
						width : "200px",
						height : "100%",
					},
					inputType : "search",
					// eventの割り当ての場合はトリガー
					option : [ {
						list : "skillDataList",
						event : [ {
							trigger : "onchange",
							eventName : "readSkillData",
							arg : ""
						} ],
					} ],
				}, {
					rowId : "type",
					rowName : " 種別",
					style : {
						width : "40px",
						height : "100%",
					},
					inputType : "text"
				}, {
					rowId : "targetSkill",
					rowName : "指定特技",
					style : {
						width : "100px",
						height : "100%",
					},
					inputType : "text"
				}, {
					rowId : "cost",
					rowName : "コスト",
					style : {
						width : "50px",
						height : "100%",
					},
					inputType : "text"
				}, {
					rowId : "effect",
					rowName : "効果",
					style : {
						width : "30em",
						height : "50px",
					},
					inputType : "textarea"
				} ]
			},
			nitijoTable : {
				tableId : "nitijou",
				tableName : "日常_設定",
				defaultRow : 3,
				tableData : [ {
					rowId : "nitijou",
					rowName : "日常",
					style : {
						width : "50px",
						height : "100%",
					},
					inputType : "text"
				}, {
					rowId : "settei",
					rowName : "設定",
					style : {
						width : "300px",
						height : "60px",
					},
					inputType : "textarea"
				} ]
			},
			yoridokoroTable : {
				tableId : "yoridokoro",
				tableName : "拠所_設定",
				defaultRow : 3,
				tableData : [ {
					rowId : "yoridokoro",
					rowName : "拠所",
					style : {
						width : "50px",
						height : "100%",
					},
					inputType : "text"
				}, {
					rowId : "settei",
					rowName : "設定",
					style : {
						width : "300px",
						height : "60px",
					},
					inputType : "textarea"
				} ]
			},
		}
	});
}
GapOjisanTRPG.prototype.createAnyTableGapOjisan_AnyA = function(id, data) {
	if (this.CharacterData.util.isEmpty(id)) {
		return;
	}
	if (this.CharacterData.util.isEmpty(data)) {
		var b = this.CharacterData
				.getAnySkillTable(this.CharacterData.sytemData["gapOjisan"]["anySkillData"][0]);
		return b.createTable(id);
	} else {
		var b =this.CharacterData.getAnySkillTable(this.CharacterData.sytemData["gapOjisan"]["anySkillData"][0]);
		var c = b.createTable(id);
		c.setData(data);
		return c;
	}
}
GapOjisanTRPG.prototype.createAnyTableGapOjisan_AnyB = function(id, data) {
	if (this.CharacterData.util.isEmpty(id)) {
		return;
	}
	if (this.CharacterData.util.isEmpty(data)) {
		var b = this.CharacterData
				.getAnySkillTable(this.CharacterData.sytemData["gapOjisan"]["anySkillData"][1]);
		return b.createTable(id);
	} else {
		var b = this.CharacterData
				.getAnySkillTable(this.CharacterData.sytemData["gapOjisan"]["anySkillData"][1]);
		var c = b.createTable(id);
		c.setData(data);
		return c;
	}
}
/**
 * ギャップおじさんTRPGのスキルテーブルを作成する
 */
GapOjisanTRPG.prototype.createAnotherTableGapOjisan = function(id) {
	return this.CharacterData.createAnotherTable(id, this.CharacterData.sytemData["gapOjisan"]["anotherTable"]);
}
/**
 * ギャップおじさんTRPGの日常の設定テーブルを作成する
 */
GapOjisanTRPG.prototype.createAnotherTableGapOjisan_nitijo = function(id) {
	return this.CharacterData.createAnotherTable(id, this.CharacterData.sytemData["gapOjisan"]["nitijoTable"]);
}
/**
 * ギャップおじさんTRPGの日常の設定テーブルを作成する
 */
GapOjisanTRPG.prototype.createAnotherTableGapOjisan_yoridokoro = function(
		id) {
	return this.CharacterData.createAnotherTable(id, this.CharacterData.sytemData["gapOjisan"]["yoridokoroTable"]);
}
/**
 * ギャップおじさんTRPGのテーブルを作成する
 *
 * @param id
 *            必須
 * @param data
 *            あったら、設定もする
 * @returns
 */
GapOjisanTRPG.prototype.createGapOjisan = function(id, data) {
	if (this.CharacterData.util.isEmpty(id)) {
		return;
	}
	if (this.CharacterData.util.isEmpty(data)) {
		var b = this.CharacterData
				.getSkillTable(this.CharacterData.sytemData["gapOjisan"]["mainSkillData"]);
		return b.createTable(id);
	} else {
		var b = this.CharacterData.getSkillTable(this.CharacterData.sytemData["gapOjisan"]["mainSkillData"]);
		var c = b.createTable(id);
		c.setData(data);
		return c;
	}
}
GapOjisanTRPG.prototype.createSealedTable = function (id) {
	if (this.CharacterData.util.isEmpty(id)) {
		return;
	}
	var SealedTable = this.CharacterData.createOneLineTable({
		tableName : "封印",
		tableId : "SealedTable",
		rowNum : 12
	});
	return SealedTable.createTable(id);
}
function readSkillData(carentCell) {
	var inputData = carentCell.val();
	var skilllData = gapOjisanSkillData[inputData];
	var thisRow = carentCell.getThisRow();
	if (!skilllData) {
		var cell = thisRow.getCellById("effect");
		cell.set("title", "");
		return;
	}
	var cell;
	for ( var key in skilllData) {
		cell = thisRow.getCellById(key);
		if (key === "effect") {
			cell.set("title", skilllData[key]);
		}
		cell.val(skilllData[key]);
	}
}
var inouTable;
var nitijouTable;
var yoriTable;
var skillTable;
var nitijo;
var yoridokoro;
var sealedTable;
window.onload = function() {
	var gap = new GapOjisanTRPG();
	// 異能テーブル
	inouTable = gap.createGapOjisan("sfTable");
	inouTable.setAttribute("align", "left");
	nitijouTable = gap.createAnyTableGapOjisan_AnyA("nitijouTable");
	yoriTable = gap.createAnyTableGapOjisan_AnyB("yoriTable");
	skillTable = gap.createAnotherTableGapOjisan("skillTable");
	nitijo = gap.createAnotherTableGapOjisan_nitijo("nitijo");
	nitijo.setAttribute("align", "left");
	yoridokoro = gap.createAnotherTableGapOjisan_yoridokoro("yoridokoro");
	// 封印テーブル
	sealedTable = gap.createSealedTable("sealedTable");
	sealedTable.setAttribute("align", "left");
	inputData();
}
