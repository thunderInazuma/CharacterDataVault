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
var table;
var tableAPI = new GapOjisanTRPGSearch();
$(document).ready(function() {
	$.extend( $.fn.dataTable.defaults, { 
		language: {
			url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
		}
	});
	$('#table').DataTable();
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