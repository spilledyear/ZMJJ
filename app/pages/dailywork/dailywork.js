/**
 * Created by qiaoliyang on 17/7/19.
 */
angular.module('dailyworkModule')

	.controller('dailyworkCtrl', [
		'$scope',
		'zmjjhttp',
		'baseConfig',
		'$stateParams',
		'$ionicLoading',
		'$window',
		'$timeout',
		'$filter',
		'$ionicScrollDelegate',
		'$ionicPopup',
		function($scope,
			zmjjhttp,
			baseConfig,
			$stateParams,
			$ionicLoading,
			$window,
			$timeout,
			$filter,
			$ionicScrollDelegate,
			$ionicPopup) {
			//初始化滑动是否加载工单
			$scope.hasmoreCargo = true;
			$scope.hasmorerework = false;
			$scope.hasmoreOther = false;
			
			$scope.cargoLoading = function() {
				$scope.hasmoreCargo = true;
				$scope.hasmorerework = false;
				$scope.hasmoreOther = false;
				$scope.items = [];
				
				$ionicScrollDelegate.$getByHandle('myscroll').scrollTop();
				
			};
			var muni = 0 ;
			$scope.otherLoading = function() {
				$scope.hasmoreCargo = false;
				$scope.hasmoreOther = true;
				$scope.hasmorerework = false;
				$scope.items = [];
				if( muni == 0){
					muni ++;
					console.log(muni);
					$ionicScrollDelegate.$getByHandle('myscroll').scrollTop();
				}
				
			};
			//获取userId
			/*console.log('userId:'+ $stateParams.userId);*/
			//报工货量的请求数据

			var distinction = 'Y';
			$scope.orderCargos = [];
			$scope.cargoBagindate = '';
			$scope.cargoEnddate = '';
			$scope.cargoPadenum = 1;
			$scope.pageSize = 10,
			$scope.cargoNumber = '';
			$scope.cargoName = '';
			$scope.cargoCode = '';
			var url = baseConfig.basePath + "/hmap/common/zmapp/searchOrder";
			$scope.loadingCargo = function() {
				$scope.curentOpeartion = '';
				var orderTypeCargo = '货量';
				var dataCargo = {
					userId : $stateParams.userId,
					orderType : orderTypeCargo,
					pageSize : $scope.pageSize,
					pageNum : $scope.cargoPadenum ,
					orderByCode : '3',
					distinction : distinction,
					beginDate : $scope.cargoBagindate,
					endDate : $scope.cargoEnddate,
					orderNumber : $scope.cargoNumber,
					projectName : $scope.cargoName ,
					orderCode : $scope.cargoCode
				}
				console.log(angular.toJson(dataCargo));
				
				zmjjhttp.getDate(url, dataCargo).success(function(result) {
					//console.log(result.errDesc);
					for(var i in result.errDesc) {
						$scope.curentOpeartion = result.errDesc[0].curentOpeartion;
					}
					if(result.errCode == 100) {
						$scope.orderCargos = result.errDesc;
					}

				});
			}
			$scope.loadingCargo();
				//报工货量上拉加载
			
			$scope.loadCargoList = function() {
				$scope.cargoPadenum ++;
				// console.log(cargoNum);
				// console.log($scope.hasmoreCargo);
				var url = baseConfig.basePath + "/hmap/common/zmapp/searchOrder";
				var orderTypeCargo = '货量';
				//var dataCargo = '{"userId":"' + $stateParams.userId + '","orderType":"' + orderTypeCargo + '","pageSize":"' + 10 + '","pageNum":"' + $scope.cargoPadenum  + '","distinction":"' + distinction + '"}';
				var dataCargo = {
					userId : $stateParams.userId,
					orderType : orderTypeCargo,
					pageSize : $scope.pageSize,
					pageNum : $scope.cargoPadenum ,
					orderByCode : '3',
					distinction : distinction,
					beginDate : $scope.cargoBagindate,
					endDate : $scope.cargoEnddate,
					orderNumber : $scope.cargoNumber,
					projectName : $scope.cargoName ,
					orderCode : $scope.cargoCode
				}
				
				zmjjhttp.getDate(url, dataCargo).success(function(result) {
					if(result.errCode == 101) {
						$scope.hasmoreCargo = false;
						result.errDesc == '';
					} else if(result.errCode == 100) {
						 console.log(result.errDesc);
						$scope.orderCargos = $scope.orderCargos.concat(result.errDesc);
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				});
			};
			
			
			
			$scope.otherBagindate = '';
			$scope.otherEnddate = '';
			$scope.otherPadenum = 1;
			$scope.otherNumber = '';
			$scope.otherName = '';
			$scope.otherCode = '';
			//报工其他请求数据
			$scope.loadingOther = function() {
				var orderTypeOther = '其它';
				var dataOther = {
					userId : $stateParams.userId,
					orderType : orderTypeOther,
					pageSize : $scope.pageSize,
					pageNum : '1' ,
					orderByCode : '3',
					distinction : distinction,
					beginDate : $scope.otherBagindate,
					endDate : $scope.otherEnddate,
					orderNumber : $scope.otherNumber,
					projectName : $scope.otherName ,
					orderCode : $scope.otherCode
				}
				console.log(angular.toJson(dataOther));
				zmjjhttp.getDate(url, dataOther).success(function(result) {
					/* console.log(result.errDesc);*/
					if(result.errCode == 100) {
						$scope.orderOthers = result.errDesc;
					}
				});
			}

			$scope.loadingOther();
			//返工数据请求
			$scope.reWork = function() {
				$scope.hasmoreCargo = false;
				$scope.hasmoreOther = false;
				$scope.hasmorerework = true;
				$scope.items = [];
				$ionicScrollDelegate.$getByHandle('myscroll').scrollTop([false]);
				//初始化选中的工单
				$scope.selected = [];
				/*console.log('rework');*/
				var url = baseConfig.basePath + "/hmap/common/zmapp/searchOrderReback";
//				var data = '{"userId":"' + $stateParams.userId + '","orderByCode":"' + 3 + '","distinction":"' + distinction + '"}';
				var data = {
					userId : $stateParams.userId,
					orderByCode : '3',
					distinction : distinction
				}
				
				
				zmjjhttp.getDate(url, data).success(function(result) {
					console.log(result.errDesc);
					console.log(result.errCode);
					if(result.errCode == 100) {
						$scope.reworks = result.errDesc;
					} else {
						$scope.reworks = '';
					}
				});
			};

			//提交工单
			$scope.orderSubmit = function(type) {
				console.log(type);
				var typeCode = ''; //类型: COMPLETE : 货量或其他 ;REWORK: 返工;
				var order_ids = ''; //只选中工单的Id
				var orderNumber = ''; //只选中工单的报工数
				var checkPart = ''; //未选中部件的部件Id为空
				var partOrderId = ''; //选中部件的工单Id
				var partId = ''; //选中的部件Id
				var partNum = ''; //选中的部件数量
				if(type == 0) {
					typeCode = 'COMPLETE';
					var checkOrderId = $('.orderId input[type=checkbox]');
					var checkOrderNum = $('.orderNum input[type=text]');
					var checkOrderIdLen = checkOrderId.length;
					for(var i = 0; i < checkOrderIdLen; i++) {
						if(checkOrderId[i].checked) {
							order_ids += angular.element(checkOrderId[i]).attr("data-orderid") + ',';
							orderNumber += checkOrderNum[i].value + ',';
							checkPart += checkPart + ',';
						}
					}
					//部件选中的Id partOrderId : 部件的工单Id ; partId: 部件Id ; partNum : 部件数量;
					var part = $('.partId input[type=checkbox]');
					var partLength = part.length;
					var partNumber = $('.partNum input[type=text]');
					for(var x = 0; x < partLength; x++) {
						if(part[x].checked) {
							partOrderId += angular.element(part[x]).attr("data-orderid") + ',';
							partId += angular.element(part[x]).attr("data-partid") + ',';
							// console.log(partNumber[x]);
							partNum += partNumber[x].value + ',';
						}
					}
				} else if(type == 1) {
					typeCode = 'COMPLETE';
					var checkOtherId = $('.otherId input[type=checkbox]');
					var checkOtherrNum = $('.otherNum input[type=text]');
					var checkOtherIdLen = checkOtherId.length;
					for(var k = 0; k < checkOtherIdLen; k++) {
						if(checkOtherId[k].checked) {
							order_ids += angular.element(checkOtherId[k]).attr("data-orderid") + ',';
							orderNumber += checkOtherrNum[k].value + ',';
							checkPart += checkPart + ',';
						}
					}
					//部件选中的Id partOrderId : 部件的工单Id ; partId: 部件Id ; partNum : 部件数量;
					var otherPartId = $('.otherPartId input[type=checkbox]');
					var otherPartLength = otherPartId.length;
					var otherPartNumber = $('.otherPartNum input[type=text]');
					for(var z = 0; z < otherPartLength; z++) {
						if(otherPartId[z].checked) {
							partOrderId += angular.element(otherPartId[z]).attr("data-orderid") + ',';
							partId += angular.element(otherPartId[z]).attr("data-partid") + ',';
							// console.log(otherPartNumber[z]);
							partNum += otherPartNumber[z].value + ',';
						}
					}
				} else {
					typeCode = 'REWORK';
					var reworkId = $('.reworkId input[type=checkbox]');
					var reworkNum = $('.reworkNum input[type=text]');
					var reworkIdLen = reworkId.length;
					for(var j = 0; j < reworkIdLen; j++) {
						if(reworkId[j].checked) {
							// console.log(reworkId[j]);
							order_ids += angular.element(reworkId[j]).attr("data-orderid") + ',';
							orderNumber += reworkNum[j].value + ',';
							checkPart += checkPart + ',';
						}
					}
					//部件选中的Id partOrderId : 部件的工单Id ; partId: 部件Id ; partNum : 部件数量;
					var reworkPart = $('.reworkPartId input[type=checkbox]');
					var reworkPartLength = reworkPart.length;
					var reworkPartNumber = $('.reworkPartNum input[type=text]');

					for(var y = 0; y < reworkPartLength; y++) {
						if(reworkPart[y].checked) {
							partOrderId += angular.element(reworkPart[y]).attr("data-orderid") + ',';
							partId += angular.element(reworkPart[y]).attr("data-partid") + ',';
							partNum += reworkPartNumber[y].value + ',';
						}
					}
				}
				var orderIds = partOrderId + order_ids;
				orderIds = orderIds.substring(0, orderIds.length - 1).split(',');
				// console.log('所有的工单Id:' + orderIds);
				var partIds = partId + checkPart;
				partIds = partIds.substring(0, partIds.length - 1).split(',');
				// console.log('所有的工单部件Id:' + partIds);
				var allNumber = partNum + orderNumber;
				allNumber = allNumber.substring(0, allNumber.length - 1).split(',');
				// console.log('所有的工单数量:' + allNumber);
				var url = baseConfig.basePath + "/hmap/common/zmapp/queryMoComplete";
				var data = '{"p_user_id":"' + $stateParams.userId + '","p_type_code":"' + typeCode + '"' +
					',"p_make_order_ids":"' + orderIds + '","p_assembly_ids":"' + partIds + '","p_qtys":"' + allNumber + '"}';
				zmjjhttp.getDate(url, data).success(function(result) {
					// console.log(result.errDesc);
					// console.log(result.errCode);
					
					/*var alertPopup = $ionicPopup.alert({
						template: result.errDesc
					});
					alertPopup.then(function(res) {
						console.log('Thank you for not eating my delicious ice cream cone');
					});*/
					if(result.errCode == 100) {
						$ionicLoading.show({
						template: result.errDesc,
						duration: 2000
					});
						if(type == 0) {
							$scope.loadingCargo();
							if($scope.loadParts){
								$scope.loadParts();
							}
							
						} else if(type == 1) {
							$scope.loadingOther();
							$scope.loadParts();
						} else {
							$scope.reWork();
							$scope.loadReworkPart();
						}
					}else{
						$ionicLoading.show({
						template: result.errDesc,
						duration: 5000
					});
					}
					/*$ionicScrollDelegate.$getByHandle('myscroll').scrollTop([false]);*/
				});
			};
			//打开或关闭部件
			$scope.parts = [];
			$scope.items = [];
			$scope.partsshow = function(i, oldF, orderId) {
				$scope.parts[i] = !oldF;
				//部件查询
				$scope.loadParts = function() {
					if($scope.parts[i] == true) {
						var url = baseConfig.basePath + "/hmap/common/zmapp/searchOrderPart";
						var data = '{"orderId":"' + orderId + '"}';
						zmjjhttp.getDate(url, data).success(function(result) {
							/*console.log(result.errDesc);*/
							if(result.errCode != 101) {
								$scope.items[i] = result.errDesc;
							}
						});
					}
				}
				$scope.loadParts();
			};
			//返工部件查询
			$scope.reworkParts = [];
			$scope.reworkItems = []
			$scope.reworkPartShow = function(i, oldf, orderId) {
				$scope.reworkParts[i] = !oldf;
				//部件查询
				$scope.loadReworkPart = function() {
					if($scope.reworkParts[i] == true) {
						var url = baseConfig.basePath + "/hmap/common/zmapp/searchOrderPartReback";
						var data = '{"orderId":"' + orderId + '"}';
						zmjjhttp.getDate(url, data).success(function(result) {
							/*console.log(result.errDesc);*/
							if(result.errCode != 101) {
								$scope.reworkItems[i] = result.errDesc;
							}
						});
					}
				}
				$scope.loadReworkPart();
			}
			//点击选中部件
			$scope.selectPart = function(e) {
				console.log(e);
			}

			var ordertype = '';
			//打开或关闭搜索
			$scope.opensearch = false;
			$scope.goSearch = function(type) {
				ordertype = type;
				$scope.opensearch = !$scope.opensearch;
			};
			//点击input时阻止默认事件
			$scope.relclick = function($event) {
				$event.stopPropagation()
			};
			//点击获取当前内容
			$scope.thatContent = function($event, con) {
				$event.stopPropagation()
				var alertPopup = $ionicPopup.alert({
					title: '显示内容',
					template: con
				});
				alertPopup.then(function(res) {
					console.log('Thank you for not eating my delicious ice cream cone');
				});
			}

			//搜索查询
			//userId : 用户ID ；orderType ：工单类型 ；beginDate ：开始时间 ；endDate ：结束时间 ；
			//orderNumber ：工单号 ；projectName ：项目名称 ；orderCode ：产品编码 。
			$scope.searchCondition = {};
			$scope.currentDate = new Date();
			$scope.endTimeDate = new Date();
			$scope.$watch('currentDate', function(newValue, oldValue) {
				if(newValue !== oldValue) {
					$scope.searchCondition.startDate = $filter('date')($scope.currentDate, 'yyyy-MM-dd');
				}
			})
			$scope.$watch('endTimeDate', function(newValue, oldValue) {
				if(newValue !== oldValue) {
					$scope.searchCondition.endDate = $filter('date')($scope.endTimeDate, 'yyyy-MM-dd');
				}
			})
			$scope.searchBtn = function() {
				var orderType = '';
				var searchDistinction = 'N';
				if(ordertype == 0) {
					orderType = '货量';
					url = baseConfig.basePath + "/hmap/common/zmapp/searchOrder";
				} else if(ordertype == 1) {
					orderType = '其它';
					url = baseConfig.basePath + "/hmap/common/zmapp/searchOrder";
				} else {
					orderType = '';
					url = baseConfig.basePath + "/hmap/common/zmapp/searchOrderReback";
				}
				if($scope.searchCondition.startDate == undefined) {
					$scope.searchCondition.startDate = '';
				}
				if($scope.searchCondition.endDate == undefined) {
					$scope.searchCondition.endDate = '';
				}
				if($scope.searchCondition.orderNum == undefined) {
					$scope.searchCondition.orderNum = '';
				}
				if($scope.searchCondition.projectName == undefined) {
					$scope.searchCondition.projectName = '';
				}
				if($scope.searchCondition.orderCode == undefined) {
					$scope.searchCondition.orderCode = '';
				}
				var beginDate = $('.startDate').val();
				// console.log($scope.searchCondition.startDate);
				if($scope.searchCondition.startDate !== '') {
					beginDate = beginDate + ' 00:00:00';
				}
				var endDate = $('.endDate').val();
				if($scope.searchCondition.endDate !== '') {
					endDate = endDate + ' 23:59:59';
				}

				/* console.log($scope.searchCondition.orderNum);
				 console.log($scope.searchCondition.projectName);
				 console.log($scope.searchCondition.orderCode);*/
				/*var data = '{"userId":"' + $stateParams.userId + '","orderType":"' + orderType + '","beginDate":"' + beginDate + '"' +
					',"endDate":"' + endDate + '","orderNumber":"' + $scope.searchCondition.orderNum + '"' +
					',"projectName":"' + $scope.searchCondition.projectName + '","orderCode":"' + $scope.searchCondition.orderCode + '"' + 
					',"distinction":"' + searchDistinction + '"}';
				*/
				var data = {
					userId : $stateParams.userId,
					orderType : orderType ,
					beginDate : beginDate ,
					endDate : endDate,
					orderNumber : $scope.searchCondition.orderNum ,
					projectName : $scope.searchCondition.projectName ,
					orderCode : $scope.searchCondition.orderCode ,
					distinction : searchDistinction
				}
				
				zmjjhttp.getDate(url, data).success(function(result) {
					 console.log(result.errDesc);
					 console.log(result.errCode);
					if(result.errCode == 101) {
						$ionicLoading.show({
							template: result.errDesc,
							duration: 2000
						});
					} else if(result.errCode == 102) {
						$ionicLoading.show({
							template: result.errDesc,
							duration: 2000
						});
					} else if(result.errDesc != '' || result.errDesc != null) {
						if(ordertype == 0) {
							$scope.orderCargos = result.errDesc;
							/*$scope.hasmoreCargo = false;*/
						} else if(ordertype == 1) {
							$scope.orderOthers = result.errDesc;
							/*$scope.hasmorerework = false;*/
						} else {
							$scope.reworks = result.errDesc;
							/*$scope.hasmoreOther = false;*/
						}
						$scope.opensearch = false;
					}

				});
			};
			//搜索end
		
			//报工其它上拉加载
			var otherNum = 1;
			$scope.loadOtherList = function() {
				otherNum++;
				// console.log(otherNum);
				var url = baseConfig.basePath + "/hmap/common/zmapp/searchOrder";
				var orderTypeCargo = '其它';
				var dataCargo = '{"userId":"' + $stateParams.userId + '","orderType":"' + orderTypeCargo + '","pageSize":"' + $scope.pageSize + '","pageNum":"' + otherNum + '","distinction":"' + distinction + '"}';
				zmjjhttp.getDate(url, dataCargo).success(function(result) {
					if(result.errCode == 101) {
						$scope.hasmoreOther = false;
					} else if(result.errCode == 100) {
						// console.log(result.errDesc);
						$scope.orderOthers = $scope.orderOthers.concat(result.errDesc);
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				});
			};
			//返工上拉加载
			var reworkNum = 1;
			$scope.loadReworkList = function() {
				reworkNum++;
				// console.log(reworkNum);
				var url = baseConfig.basePath + "/hmap/common/zmapp/searchOrderReback";
				var dataCargo = '{"userId":"' + $stateParams.userId + '","pageSize":"' + $scope.pageSize+ '","pageNum":"' + reworkNum + '","distinction":"' + distinction + '"}';
				zmjjhttp.getDate(url, dataCargo).success(function(result) {
					if(result.errCode == 101) {
						$scope.hasmorerework = false;
					} else if(result.errCode == 100) {
						// console.log(result.errDesc);
						$scope.reworks = $scope.reworks.concat(result.errDesc);
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				});
			};
		}
	])
	//zmjjhttp请求
	.service('zmjjhttp', ['$http', function($http) {
		this.getDate = function(url, data) {
			return $http.post(url, data);
		}
	}]);