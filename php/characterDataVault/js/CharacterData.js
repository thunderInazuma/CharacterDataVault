/**
 *
 */
var CharacterData = (function() {
	var CharacterData = function() {
	};
	// いろいろ
	CharacterData.prototype.util = {
		/**
		 * 空チェック
		 */
		isEmpty : function(str) {
			return (str === "" || str === null || str === undefined);
		}
	};
	CharacterData.prototype.getInstace = function() {
		return new CharacterData();
	}
	// チェック時の色
	var selectedCss = {
		gap : "#2ECCFA",// #dcd6d9 #2ECCFA #A9F5D0
		skill : "#FFFF00",// #b9d08b #FFFF00 #ACFA58
	}
	// tableのスタイル
	var commonStyle = {
		textAlign : "center",
		userSelect : "none",
		backgroundColor : ""// #d6c6af #FBF2EF #d6c6af #FAFAFA
	};
	// 1行テーブル
	CharacterData.prototype.createOneLineTable = function (data) {
		return new OneLineTable(data);
	}
	var OneLineTable = function(data) {
		this.data = data;
		// データ構造
		// テーブル名 tableName
		// テーブルID tableId
		// 行数 rowNum

		// id = 設定先DIVタグID
		this.createTable = function(id) {
			var element = document.getElementById(id);
			// テーブルがすでにある場合はreturnする
			if (element.getAttribute("oneLineTableFlg") == "true") {
				return;
			}
			element.setAttribute("oneLineTableFlg", "true");
			var table = document.createElement("table");
			table.id = this.data["tableId"]+ "_OneLineTable";
			table.border = "1";
			table.setAttribute("cellspacing", "0");
			var headderRow = table.insertRow(-1);
			var headderCell = createCell(headderRow, this.data["tableName"], this.data["tableId"]+ "_headderRow" + " tableHedder");
			for (var i = 0; i < this.data["rowNum"]; i++) {
				var row = table.insertRow(-1);
				var cell = createCell(row, "", "oneLineTable_cell");
				cell.style.width = "80px";
				var createInputDom = createInput("text");
				createInputDom.style.width = "98%";
				cell.appendChild(createInputDom);
			}
			element.appendChild(table);
			return new SealedTable(table.id);
		}
	}
	//封印テーブルデータ取り扱いクラス
	function SealedTable(id){
		this.table = document.getElementById(id);
		this.setData = function(dataArray) {
			var cellArray = this.table.getElementsByClassName("oneLineTable_cell");
			if (typeof dataArray === "object") {
				for (var i in dataArray) {
					var inputDom = cellArray[i].getElementsByTagName("input")[0];
					inputDom.value = dataArray[i];
				}
			} else if (typeof dataArray === "string") {
				dataArray = JSON.parse(dataArray);
				for (var i in dataArray) {
					var inputDom = cellArray[i].getElementsByTagName("input")[0];
					inputDom.value = dataArray[i];
				}
			}
		}
		this.getData = function() {
			var cellArray = this.table.getElementsByClassName("oneLineTable_cell");
			var retArray = [];
			var length = cellArray.length;
			for (var i = 0;i < length;i++) {
				var inputDom = cellArray[i].getElementsByTagName("input")[0];
				retArray.push(inputDom.value);
			}
			return retArray;
		}
		this.getJson = function() {
			return JSON.stringify(this.getSealedTableData());
		}
		this.setAttribute = function(str1, str2) {
			this.table.setAttribute(str1, str2);
		}
		this.getAttribute = function(str1) {
			return this.table.getAttribute(str1);
		}
	}
	// テーブル管理用オブジェクト
	var TableData = function(id) {
		this.id = id;
		this.tableId = id + "_skillTable";
		this.table = document.getElementById(this.tableId);
		this.setAttribute = function() {
			this.table.setAttribute(arguments[0], arguments[1]);
		}
		/**
		 * データをセットする
		 */
		this.inputData = function(data) {
			var table = this.table;
			var length;
			for (var i = 0; i < 6; i++) {
				var skillId = "skill" + gapArray[i];
				var skill = table.getElementsByClassName(skillId);
				length = skill.length;
				var skillArray = data[skillId];
				for (var t = 0; t < length; t++) {
					var element = skill[t];
					if (skillArray.indexOf(element.innerText) !== -1) {
						element.setAttribute("selectflg", "true");
						element.style.backgroundColor = selectedCss.skill;
					} else {
						element.setAttribute("selectflg", "false");
						element.style.backgroundColor = commonStyle.backgroundColor;
					}
				}
				// ギャップをチェック
				if (data["selectGap"].indexOf(gapArray[i]) !== -1) {
					var gap = table.getElementsByClassName("gap" + gapArray[i]);
					var gapLength = gap.length;
					for (var g = 0; g < gapLength; g++) {
						var element = gap[g];
						element.setAttribute("selectflg", "true");
						element.style.backgroundColor = selectedCss.gap;
					}
				}
			}
		}
		/**
		 * objectのデータを取得する
		 */
		this.getData = function() {
			var table = this.table;
			var retData = {};
			var length;
			var checkGap = [];
			for (var i = 0; i < 6; i++) {
				var skillId = "skill" + gapArray[i];
				var skill = table.getElementsByClassName(skillId);
				length = skill.length;
				var skillDataArray = [];
				for (var t = 0; t < length; t++) {
					var element = skill[t];
					if (element.getAttribute("selectflg") == "true") {
						skillDataArray.push(element.innerText);
					}
				}
				retData[skillId] = skillDataArray;
				// ギャップのチェックを取得
				var gap = table.getElementsByClassName("gap" + gapArray[i]);
				if (gap.length > 0) {
					if (gap[0].getAttribute("selectflg") == "true") {
						checkGap.push(gapArray[i]);
					}
				}
			}
			retData["selectGap"] = checkGap;
			return retData;
		}
		/**
		 * データを設定する
		 */
		this.setData = function(data) {
			if (typeof data === "object") {
				this.inputData(data);
			} else if (typeof data === "string") {
				this.inputData(JSON.parse(data));
			}
		}
		/**
		 * json形式でデータを返す
		 *
		 * @returns
		 */
		this.getDataJson = function() {
			return JSON.stringify(this.getData());
		}
		/**
		 * エディットフラグを変更する
		 *
		 * @param flg
		 */
		this.changeEditFlg = function(flg) {
			var editCell = this.table.getElementsByClassName("editModeCell")[0];
			if (flg === true) {
				editCell.innerText = "編集OK";
				editCell.setAttribute("editFlg", "true");
				editCell.style.backgroundColor = "";
			} else if (flg === false) {
				editCell.innerText = "編集NG";
				editCell.setAttribute("editFlg", "false");
				editCell.style.backgroundColor = selectedCss.skill;
			}
		}
	}
	var AnyTableData = function(id) {
		TableData.call(this, id);
		this.id = id;
		this.tableId = id + "_anyTable";
		this.table = document.getElementById(this.tableId);
		/**
		 * データをセットする オーバーライド
		 */
		this.inputData = function(data) {
			var table = this.table;
			var length;
			for ( var i in data) {
				var skillId = i;
				var skill = table.getElementsByClassName(skillId);
				var skillArray = data[skillId];
				length = skill.length;
				for (var t = 0; t < length; t++) {
					var element = skill[t];
					if (skillArray.indexOf(element.innerText) !== -1) {
						element.setAttribute("selectflg", "true");
						element.style.backgroundColor = selectedCss.skill;
					} else {
						element.setAttribute("selectflg", "false");
						element.style.backgroundColor = commonStyle.backgroundColor;
					}
				}
			}
		}
		/**
		 * objectのデータを取得する オーバーライド
		 */
		this.getData = function() {
			var table = this.table;
			var retData = {};
			var length;
			var checkGap = [];
			// anySkillHrader
			var skillLength = table.getElementsByClassName("anySkillHrader").length;
			var skillArray;
			for (var i = 0; i < skillLength; i++) {
				skillArray = table.getElementsByClassName("skill" + i);
				var inputArray = [];
				for (var s = 0; s < skillArray.length; s++) {
					var skillCell = skillArray[s];
					if (skillCell.getAttribute("selectflg") === "true") {
						inputArray.push(skillCell.innerText);
					}
				}
				retData["skill" + i] = inputArray;
			}
			return retData;
		}
	}
	// ギャップの数
	this.gapPatternObj = {
		A_E : 5,
		A_F : 6
	};
	this.gapArray = [ "A", "B", "C", "D", "E", "F" ];
	/**
	 * AnotherTableの行操作オブジェクト
	 */
	var AnotherTableRow = function(inputRow) {
		this.row = inputRow;
		this.getCellById = function(name) {
			return new AnotherTableCell(
					this.row.getElementsByClassName(name)[0]);
		}

	}
	/**
	 * AnotherTableのセル操作オブジェクト
	 */
	var AnotherTableCell = function(inputCell) {
		this.cell = inputCell;
		this.internalDom = inputCell.childNodes[0];
		this.getThisCellArray = function() {

		}
		this.getThisTable = function() {

		}
		this.getThisRow = function() {
			return new AnotherTableRow(this.cell.parentNode);
		}
		this.set = function(str, str2) {
			this.internalDom.setAttribute(str, str2);
		}
		/**
		 * 中の要素に引数の値をセットする 戻り値：internalDomのvalue
		 */
		this.val = function(str) {
			if (!str) {
				return this.internalDom.value;
			}
			this.internalDom.value = str;
			return this.internalDom.value;
		}
		this.baindFunc = function(bindName, func, arg) {
			var inputFunc;
			var inputArg = "";
			if (arg) {
				inputArg = arg;
			}
			if (typeof func === "string") {

				inputFunc = func + "(" + arg + ")";
			} else if (typeof func === "function") {
				inputFunc = function() {
					func(arg);
				};
			}
			this.internalDom.setAttribute(bindName, inputFunc);
		}
		this.unBaindFunc = function(bindName) {
			this.internalDom.setAttribute(bindName, "");
		}
	}
	CharacterData.prototype.getATCInsetace = function(dom) {
		return new AnotherTableCell(dom);
	}
	/**
	 * さらにその他テーブルanotherTable
	 */
	var AnotherTableData = function(id, data) {
		TableData.call(this, id);
		this.id = id;
		this.tableId = id + "_anotherTable";
		this.table = document.getElementById(this.tableId);
		this.data = data;
		/**
		 * 末尾行追加
		 */
		this.addRow = function() {
			var colnum = this.table.getElementsByClassName("tableHeader").length;
			var row = this.table.insertRow(-1);
			var nowRow = this.table.getElementsByClassName("numberCell").length;
			var numberCell = createCell(row, nowRow + 1, "numberCell"  + " tableHedder");
			setStyle(numberCell, {
				height : "10px"
			});
			numberCell.setAttribute("padding", 1);
			numberCell.setAttribute("margin", 1);
			for (var i = 0; i < colnum; i++) {
				var cell = createCell(row, "", "tableCell" + i);
				var inputType = this.data["tableData"][i]["inputType"];
				var optionData = this.data["tableData"][i]["option"];
				var createInputDom = createInput(inputType, optionData);
				createInputDom.setAttribute("padding", 1);
				createInputDom.setAttribute("margin", 1);
				var style = this.data["tableData"][i]["style"];
				style["textAlign"] = "left";
				setStyle(createInputDom, style);
				cell.appendChild(createInputDom);
				var name = this.data["tableData"][i]["rowId"];
				cell.classList.add(name);
				cell.setAttribute("colnum", i);
			}
			return row;
		}
		/**
		 * 末尾行削除
		 */
		this.removeLastRow = function() {
			var table = this.table;
			var lastRowIndex = table.getElementsByTagName("tr").length - 1;
			table.deleteRow(lastRowIndex);
		}
		/**
		 * データをセットする オーバーライド
		 */
		this.inputData = function(data) {
			var table = this.table;
			var nowTableRowLength = table.getElementsByClassName("numberCell").length;
			var tableRow = table.getElementsByTagName("tr");
			for ( var i in data) {
				// 1 2 行目はヘッダー
				var nowRow = tableRow[new Number(i) + 2];
				var rowData = data[i];
				// 行が足りない場合追加
				if (!nowRow) {
					this.addRow();
					nowRow = tableRow[new Number(i) + 2];
				}
				// セルに追加
				for ( var key in rowData) {
					var cell = nowRow.getElementsByClassName(key)[0];
					if (!cell) {
						continue;
					}
					var dom = cell.childNodes[0];
					if (dom.tagName =="LABEL") {
						dom.innerText = rowData[key];
					}else {
						dom.value = rowData[key];
					}

				}
			}
		}
		/**
		 * objectのデータを取得する オーバーライド objectの配列を返却する
		 */
		this.getData = function() {
			var table = this.table;
			var retData = [];
			var length;
			var rowArray = table.getElementsByTagName("tr");
			var rowLength = rowArray.length;
			// 0と1行目はヘッダ
			for (var i = 2; i < rowLength; i++) {
				var row = rowArray[i];
				var rowObj = {};
				var cellArray = row.getElementsByTagName("td");
				var cellArraySize = cellArray.length;
				// 0行目はNo列
				for (var c = 1; c < cellArraySize; c++) {
					var cell = cellArray[c];
					var cellData = cell.childNodes[0].value;
					rowObj["tableCell" + (c - 1)] = cellData;
				}
				retData.push(rowObj);
			}
			return retData;
		}
	}
	/**
	 * AnotherTable用関数
	 */
	var createInput = function(inputType, optionArray) {
		var dom;
		if (inputType === "text") {
			dom = document.createElement('input');
		} else if (inputType === "textarea") {
			dom = document.createElement('textarea');
		} else if (inputType === "search") {
			dom = document.createElement('input')
			dom.setAttribute("type", "search");
		} else if (inputType === "label") {
			dom = document.createElement('label');
		} else if (inputType === "button") {
			dom = document.createElement('input');
			dom.setAttribute("type", "button");
		} else {
			dom = document.createElement(inputType);
		}
		// 第二引数のオプションを属性として割り当てる
		for ( var i in optionArray) {
			var option = optionArray[i];
			for ( var key in option) {
				if (key === "event") {
					var event = option[key];
					if (Array.isArray(event)) {
						// 配列の場合
						for (var e = 0; e < event.length; e++) {
							var eventA = event[e];
							var trigger = eventA["trigger"];
							var eventName = eventA["eventName"];
							var arg = "";
							if (eventA["arg"]) {
								arg = ", " + eventA["arg"];
							}
							dom
									.setAttribute(
											trigger,
											eventName
													+ "($CharacterData.getATCInsetace(this.parentNode)"
													+ arg + ")");
						}
					} else {
						var trigger = event["trigger"];
						var eventName = event["eventName"];
						var arg = "";
						if (event["arg"]) {
							arg = ", " + event["arg"];
						}
						dom
								.setAttribute(
										trigger,
										eventName
												+ "($CharacterData.getATCInsetace(this.parentNode)"
												+ arg + ")");
					}
				} else {
					dom.setAttribute(key, option[key]);
				}
			}
		}
		return dom;
	};
	var createEventString = function() {

	}
	var AnotherTable = function(anotherTableData) {
		this.data = anotherTableData;
		this.commonStyle = commonStyle;
		this.cellLength = this.data["tableData"].length;
		this.defaultRow = this.data["defaultRow"];
		this.dataId = anotherTableData["tableId"];
		/**
		 *
		 */
		this.createTable = function(id) {
			var element = document.getElementById(id);
			// テーブルがすでにある場合はreturnする
			if (element.getAttribute("skilltableFlg") == "true") {
				return;
			}
			element.setAttribute("skilltableFlg", "true");
			var table = document.createElement("table");
			table.id = id + "_anotherTable";
			table.border = "1";
			table.setAttribute("cellspacing", "0");
			// テーブル名作成
			// No列 + 各種セルの数を数える
			var tableData = this.data["tableData"];
			var tableHeaderRow = table.insertRow(-1);
			setStyle(tableHeaderRow);
			var tableName = this.data["tableName"];
			var tableHeaderCell = createCell(tableHeaderRow, tableName,
					"anotherTableHeader");
			tableHeaderCell.setAttribute("colspan", this.cellLength + 1);// No列の分を足す
			// ヘッダー
			var headerRow = table.insertRow(-1);
			setStyle(headerRow);
			var numberCell = createCell(headerRow, "No", "numberHeader");
			for (var i = 0; i < this.cellLength; i++) {
				var cell = createCell(headerRow,
						this.data["tableData"][i]["rowName"], "tableHeader");
			}
			element.appendChild(table);
			var anotherTableData = new AnotherTableData(id, this.data)
			// styleの適用
			// 初期のセル
			for (var a = 0; a < this.defaultRow; a++) {
				anotherTableData.addRow();
			}
			return anotherTableData;
		}
	}
	/**
	 * その他2テーブルを作成する
	 */
	CharacterData.prototype.createAnotherTable = function(id, tableData) {
		var a = new AnotherTable(tableData);
		return a.createTable(id);
	}
	/**
	 * その他テーブルを作成する
	 */
	CharacterData.prototype.getAnotherTable = function(anotherTableData) {
		return new AnotherTable(anotherTableData);
	}

	/**
	 * その他技能テーブル
	 */
	var AnySkillTable = function(anySkillData, tableStyle) {
		// データ
		this.anySkillData = anySkillData;
		this.commonStyle = commonStyle;
		this.numberRowType = anySkillData["numberRow"];
		if (tableStyle) {
			this.commonStyle = tableStyle;
		}
		/**
		 * その他技能テーブルを作る
		 */
		this.createTable = function(id) {
			var element = document.getElementById(id);
			// テーブルがすでにある場合はreturnする
			if (element.getAttribute("skilltableFlg") == "true") {
				return;
			}
			var anySkillTableName = anySkillData["anySkillTableName"];
			element.setAttribute("skilltableFlg", "true");
			var table = document.createElement("table");
			table.align = "left";
			table.id = id + "_anyTable";
			table.border = "1";
			table.setAttribute("cellspacing", "0");
			var anySkillNumber = anySkillData["anySkillData"].length;
			// 技能ヘッダー作成
			var headerRow = table.insertRow(-1);
			var headerCell = createCell(headerRow, anySkillTableName, table.id);
			headerCell.setAttribute("colspan", ((anySkillNumber * 2) - 1));
			var editCell = createCell(headerRow, "編集OK", "editModeCell");
			editCell.setAttribute("editFlg", "true");
			editCell.addEventListener("click", changeEditFlg);
			// changeEditFlg
			var skillHeaderRow = table.insertRow(-1);
			// ヘッダーを描く
			for (var i = 0; i < anySkillNumber; i++) {
				// 数値が前
				if (this.numberRowType === "front") {
					createCell(skillHeaderRow, "", "numberHeader");
				}
				createCell(skillHeaderRow,
						anySkillData["anySkillData"][i]["anySkillName"],
						"anySkillHrader");
				// 数値が後ろ
				if (this.numberRowType === "back") {
					createCell(skillHeaderRow, "", "numberHeader");
				}
			}
			var skillLength = anySkillData["anySkillData"][0]["anySkillArray"].length;
			// 技能を書き出す
			for (var i = 0; i < skillLength; i++) {
				var skillRow = table.insertRow(-1);
				for (var t = 0; t < anySkillNumber; t++) {
					// 数値が前
					if (this.numberRowType === "front") {
						createCell(skillRow, (i + 2), "numberHeader");
					}
					var skillCell = createCell(
							skillRow,
							anySkillData["anySkillData"][t]["anySkillArray"][i],
							"skill" + t);
					skillCell.setAttribute("selectFlg", "false");
					skillCell.addEventListener("click", chengeSelect);
					// 数値が後ろ
					if (this.numberRowType === "back") {
						createCell(skillRow, (i + 2), "numberHeader");
					}
				}
			}
			// styleの適用
			setStyle(table);
			// 作成したテーブルをtagへ配置
			element.appendChild(table);
			var any = new AnyTableData(id);
			return any;
		}
	}
	CharacterData.prototype.getAnySkillTable = function(anySkillData) {
		return new AnySkillTable(anySkillData);
	}
	CharacterData.prototype.createAnyTable = function(id, data, systemData) {

	}
	/**
	 * テーブルのeditFlgを取得する
	 */
	var getEditFlg = function(table) {
		var editCell = table.getElementsByClassName("editModeCell")[0]
		return editCell.getAttribute("editFlg");
	}
	// -------汎用START-------
	/**
	 * セルを書き出す
	 */
	var createCell = function(row, innerStr, className) {
		var cell = row.insertCell(-1);
		cell.className = className;
		cell.innerText = innerStr;
		return cell;
	};
	/**
	 * elementに対して 共通のstyleを設定する
	 */
	var setStyle = function(element, style) {
		if (undefined !== style) {
			for ( var i in style) {
				element.style[i] = style[i];
			}
			return;
		}
		if (commonStyle) {
			for ( var i in commonStyle) {
				element.style[i] = commonStyle[i];
			}
		}
	}
	/**
	 * クリックしたセルの色を変更する
	 */
	var chengeSelect = function() {
		var parentTable = this.parentNode.parentNode.parentNode;
		if (getEditFlg(parentTable) == "false") {
			return;
		}
		if (this.getAttribute("selectFlg") == "false") {
			this.setAttribute("selectFlg", "true");
			this.style.backgroundColor = selectedCss.skill;
		} else {
			this.setAttribute("selectFlg", "false");
			this.style.backgroundColor = "";
		}
	}
	/**
	 * 編集モードの切り替え
	 */
	var changeEditFlg = function() {
		if (this.getAttribute("editFlg") === "true") {
			this.innerText = "編集NG";
			this.setAttribute("editFlg", "false");
			this.style.backgroundColor = selectedCss.skill;
		} else {
			this.innerText = "編集OK";
			this.setAttribute("editFlg", "true");
			this.style.backgroundColor = "";
		}
	}
	// -------汎用END-------
	// 技能テーブル作成用クラス
	var SaikoroFictionSkillTable = function(sytemData, tableStyle) {
		// システム名
		var systemName = sytemData.systemName;
		// 技能
		var aboutSkillName = sytemData.aboutSkillName;
		// 技能ヘッダー名
		var headerSkillNameArray = sytemData.headerSkillNameArray;
		// 各種データ
		this.skillData = {
			skillNameArrayA : sytemData.skillNameArrayA,
			skillNameArrayB : sytemData.skillNameArrayB,
			skillNameArrayC : sytemData.skillNameArrayC,
			skillNameArrayD : sytemData.skillNameArrayD,
			skillNameArrayE : sytemData.skillNameArrayE,
			skillNameArrayF : sytemData.skillNameArrayF,
		};
		this.commonStyle = commonStyle;
		if (tableStyle) {
			this.commonStyle = tableStyle;
		}
		// ギャップの数
		var gapPattern = sytemData.gapPattern;
		// 横に技能のサブ分類がある場合
		var specialCellHedder = sytemData.specialCellHedder;
		/**
		 * ギャップ列の色を変える
		 */
		var changeGaps = function() {
			var gapsName = this.className;
			var gaps = document.getElementsByClassName(gapsName);
			var length = gaps.length;
			for (var i = 0; i < length; i++) {
				changeGap(gaps[i]);
			}
		}
		/**
		 * ギャップの色を変える
		 */
		var changeGap = function(cell) {
			var parentTable = cell.parentNode.parentNode.parentNode;
			if (getEditFlg(parentTable) == "false") {
				return;
			}
			if (cell.getAttribute("selectFlg") == "false") {
				cell.setAttribute("selectFlg", "true");
				cell.style.backgroundColor = selectedCss.gap;
			} else {
				cell.setAttribute("selectFlg", "false");
				cell.style.backgroundColor = "";
			}
		}
		/**
		 * ギャップを描く
		 */
		var gapWrite = function(row, i, gapWriteFlg, className) {
			var innerText = gapWriteFlg ? gapArray[i] : "";
			var gap = createCell(row, innerText, className);
			gap.className = "gap gap" + gapArray[i];
			gap.setAttribute("selectFlg", "false");
			gap.addEventListener("click", changeGaps);
		};
		/**
		 * セルのデータを作成する
		 */
		var createCellData = function(row, innerStr, i, gapWriteFlg,
				setSelectFlg) {
			// ギャップタイプによって変える
			if (gapPattern === gapPatternObj.A_F) {
				gapWrite(row, i, gapWriteFlg);
			}
			var cell = createCell(row, innerStr, gapWrite);
			cell.className = "skill" + gapArray[i];
			if (setSelectFlg) {
				cell.setAttribute("selectFlg", "false");
				cell.addEventListener("click", chengeSelect);
			}
			if (gapPattern === gapPatternObj.A_E && i < 5) {
				gapWrite(row, i, gapWriteFlg);
			}
		};
		/**
		 * 特殊列の対応
		 */
		function createSpecialCell3(row, i) {
			if (i == 0) {
				var cell = createCell(row, "", "sp");
			}
			if (i == 1) {
				var cell = createCell(row, specialCellHedder[0], "sp");
				cell.setAttribute("rowspan", "3");
			}
			if (i == 4) {
				var cell = createCell(row, specialCellHedder[1], "sp");
				cell.setAttribute("rowspan", "3");
			}
			if (i == 7) {
				var cell = createCell(row, specialCellHedder[2], "sp");
				cell.setAttribute("rowspan", "3");
			}
			if (i == 10) {
				var cell = createCell(row, "", "sp");
			}
		}
		// 技能データを元に指定IDに対して、テーブルを作成します。
		this.createTable = function(id) {
			var element = document.getElementById(id);
			// テーブルがすでにある場合はreturnする
			if (element.getAttribute("skilltableFlg") == "true") {
				return;
			}
			element.setAttribute("skilltableFlg", "true");
			var table = document.createElement("table");
			table.id = id + "_skillTable";
			table.border = "1";
			table.setAttribute("cellspacing", "0");
			// 技能ヘッダー作成
			var headerRow = table.insertRow(-1);
			// 両サイドに特殊表記
			if (0 < specialCellHedder.length) {
				createCell(headerRow, "", "sp");
			}
			// ダイス適用列
			createCell(headerRow, aboutSkillName, "numberHeader");
			for ( var i in headerSkillNameArray) {
				createCellData(headerRow, headerSkillNameArray[i], i, true);
			}
			// 両サイドに特殊表記
			if (0 < specialCellHedder.length) {
				createCell(headerRow, "", "sp");
			}
			// 技能欄
			for ( var i in this.skillData.skillNameArrayA) {
				// 行を行末に追加
				var row = table.insertRow(-1);
				// 両サイドに特殊表記
				if (3 == specialCellHedder.length) {
					createSpecialCell3(row, i);
				}
				createCell(row, (2 + new Number(i)), "numberHeader");
				for ( var t in headerSkillNameArray) {
					var name = (this.skillData["skillNameArray" + gapArray[t]][i]);
					createCellData(row, name, t, false, true);
				}
				createCell(row, (2 + new Number(i)), "numberHeader");
				// 両サイドに特殊表記
				if (3 == specialCellHedder.length) {
					createSpecialCell3(row, i);
				}
			}

			// 編集切り替えセル
			var editCell = createCell(headerRow, "編集OK", "editModeCell");
			editCell.id = "editModeCell";
			editCell.setAttribute("editflg", "true");
			editCell.addEventListener("click", changeEditFlg);
			// styleの適用
			setStyle(table);
			element.appendChild(table);
			return new TableData(id);
		}
	};
	SaikoroFictionSkillTable.prototype.removeTable = function(id) {
		var element = document.getElementById(id);
		var table = element.childNodes;
		table[0].parentNode.removeChild(table[0]);
		element.setAttribute("skilltableflg", "");
	}

	CharacterData.prototype.extend = function(obj, extendMap) {
		for ( var key in extendMap) {
			obj[key] = extendMap[key];
		}
	}
	CharacterData.prototype.getGapPattern = function(key) {
		return gapPatternObj[key];
	}
	CharacterData.prototype.createSFTable = function(id, data, tableData) {
		if (this.util.isEmpty(id)) {
			return;
		}
		if (this.util.isEmpty(data)) {
			var a = this.getInstace();
			var b = a.getSkillTable(tableData);
			return b.createTable(id);
		} else {
			var a = this.getInstace();
			var b = a.getSkillTable(tableData);
			var c = b.createTable(id);
			c.setData(data);
			return c;
		}
	}
	CharacterData.prototype.setSystemData = function(setData) {
		for ( var key in setData) {
			this.sytemData[key] = setData[key];
		}
	}
	CharacterData.prototype.sytemData = {};
	/**
	 * テーブルを作成するオブジェクト
	 */
	CharacterData.prototype.getSkillTable = function(sytemData) {
		return new SaikoroFictionSkillTable(sytemData);
	}
	return CharacterData;
}());
$CharacterData = new CharacterData();
