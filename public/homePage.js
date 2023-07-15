"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = function () {
  ApiConnector.logout(function (response) {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current(function (response) {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

function getRate() {
  ApiConnector.getStocks(function (response) {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

getRate();
setInterval(getRate(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, function (response) {
    // console.log(response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс успешно пополнен");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, function (response) {
    // console.log(response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Конвертация успешно выполнена");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, function (response) {
    // console.log(response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Перевод успешно выполнен");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(function (response) {
  //console.log(response);
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, function (response) {
    //console.log(response);
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  });
};

favoritesWidget.removeUserCallback = function (id) {
  ApiConnector.removeUserFromFavorites(id, function (response) {
    // console.log(response);
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  });
};
