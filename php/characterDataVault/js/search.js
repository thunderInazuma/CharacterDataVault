var GapOjisanTRPGSearch = function() {
	this.CharacterData = new CharacterData();
	this.CharacterData.setSystemData({
		anotherTable : {
			plName : "プレイヤー名",
			pcName : "キャラクター名",
		},
		anotherTable : {
			tableId : "sreachData",
			tableName : "キャラクターデータ",
			defaultRow : 5,
			tableData : [ {
				rowId : "plName",
				rowName : "プレイヤー名",
				style : {
					width : "150px",
					height : "100%",
				},
				inputType : "label",
			// eventの割り当ての場合はトリガー
			// option : [ {
			// list : "skillDataList",
			// event : [ {
			// trigger : "onClick",
			// eventName : "readSkillData",
			// arg : ""
			// } ],
			// } ],
			}, {
				rowId : "pcName",
				rowName : " キャラクター名",
				style : {
					width : "60px",
					height : "100%",
				},
				inputType : "label"
			} ]
		}
	});
};
GapOjisanTRPGSearch.prototype.crateSearchTable = function(id, data) {
	return this.CharacterData.createAnotherTable(id,
			this.CharacterData.sytemData["anotherTable"]);
};
var options = {
	perPage : 20,
	initPage : 1, // 最初に表示するページ
	optionsForRows : [ 1, 5, 10 ], // 表示する行数
	rowsPerPage : 5
// デフォルト表示行数
};
var table;
var tableAPI = new GapOjisanTRPGSearch();
$(document).ready(function() {

	$('#table').tablePagination(options);
	// $.ajax({
	// type : "POST",
	// url : "../../controller/loadAlldata.php",
	// dataType : "json",
	// success : function(data) {
	// table = tableAPI.crateSearchTable("table");
	// table.setData(data);
	// $('#table_anotherTable').tablePagination(options);
	// }
	// });
});