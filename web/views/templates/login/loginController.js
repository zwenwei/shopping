angular.module('app')
	.controller('loginController', ['$scope', '$timeout', '$state', 'utils', 'API', function ($scope, $timeout, $state, utils, API) {

		$scope.data = {
			email: '',
			pwd: ''
		};
		
		$scope.login = function () {
			if (!validLogin()) {
				return;
			}
			utils.tips.showLoadTips();
			API.fetchPost('/login', $scope.data)
				.then(function (data) {
					utils.tips.hideLoadTips();
					showTips(data.data.msg);
					$timeout(function () {
						$scope.tips.close();
						$state.go('main.home');
					}, 3000);
				})
				.catch(function (err) {
					console.log(err);
					utils.tips.hideLoadTips();
				})

		}

		function showTips(msg) {
			utils.tips.showTips(msg, $scope);
		}

		function validLogin() {
			if (!utils.validForm.isNotEmpty($scope.data.email)) {
				showTips('邮箱不能为空');
				return false;
			} else if (!utils.validForm.isEmail($scope.data.email)) {
				showTips('邮箱格式不正确');
				return false;
			}

			if (!utils.validForm.isNotEmpty($scope.data.pwd)) {
				showTips('密码不能为空');
				return false;
			} else if (!utils.validForm.isLength($scope.data.pwd, 8, 16)) {
				showTips('密码字符个数8-16');
				return false;
			} else if (utils.validForm.isNotOnlyW($scope.data.pwd)) {
				showTips('密码只能是下划线字母数字');
				return false;
			}

			return true;
		}

	}])