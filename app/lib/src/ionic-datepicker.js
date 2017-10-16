"use strict";
angular.module("ionic-datepicker", ["ionic", "ionic-datepicker.templates"]).directive("ionicDatepicker", ["$ionicPopup",
	function(e) {
		return {
			restrict: "AE",
			replace: !0,
			scope: {
				ipDate: "=idate"
			},
			link: function(t, n) {
				var a = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					r = angular.copy(t.ipDate);
				t.weekNames = ["日", "一", "二", "三", "四", "五", "六"];
				var o = function(e) {
					console.log(e)
					var n = new Date(e.getFullYear(), e.getMonth(), 1).getDate(),
						r = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
					t.dayList = [];
					for(var o = n; r >= o; o++) {
						var l = new Date(e.getFullYear(), e.getMonth(), o);
						t.dayList.push({
							date: l.getDate(),
							month: l.getMonth(),
							year: l.getFullYear(),
							day: l.getDay(),
							dateString: l.toString(),
							epochLocal: l.getTime(),
							epochUTC: l.getTime() + 60 * l.getTimezoneOffset() * 1e3
						})
					}
					for(var n = t.dayList[0].day, i = 0; n > i; i++) t.dayList.unshift({});
					t.rows = [],
						t.cols = [],
						t.currentMonth = a[e.getMonth()],
						t.currentYear = e.getFullYear(),
						t.numColumns = 7,
						t.rows.length = 6,
						t.cols.length = t.numColumns
				};
				t.prevMonth = function() {
						1 === r.getMonth() && r.setFullYear(r.getFullYear()),
							r.setMonth(r.getMonth() - 1),
							t.currentMonth = a[r.getMonth()],
							t.currentYear = r.getFullYear(),
							o(r)
					},
					t.nextMonth = function() {
						11 === r.getMonth() && r.setFullYear(r.getFullYear()),
							r.setMonth(r.getMonth() + 1),
							t.currentMonth = a[r.getMonth()],
							t.currentYear = r.getFullYear(),
							o(r)
					},
					t.date_selection = {
						selected: !1,
						selectedDate: "",
						submitted: !1
					},
					t.dateSelected = function(e) {
						t.selctedDateString = e.dateString,
							t.date_selection.selected = !0,
							t.date_selection.selectedDate = new Date(e.dateString)
					},
					n.on("click",
						function() {
							o(angular.copy(t.ipDate)),
								e.show({
									templateUrl: "date-picker-modal.html",
									title: "<strong>选择日期</strong>",
									subTitle: "",
									scope: t,
									buttons: [{
											text: "取消"
										},
										{
											text: "确定",
											type: "button-positive",
											onTap: function(e) {
												t.date_selection.submitted = !0,
													t.date_selection.selected === !0 ? t.ipDate = angular.copy(t.date_selection.selectedDate) : e.preventDefault()
											}
										}
									]
								})
						})
			}
		}
	}
]);