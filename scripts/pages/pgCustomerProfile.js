const extend = require('js-base/core/extend');
const PgCustomerProfileDesign = require('ui/ui_pgCustomerProfile');
const pageContextPatch = require("../context/pageContextPatch");
const FlWardrobe = require("components/FlWardrobe");
const FlCustomerProfileReservationItem = require("components/FlCustomerProfileReservationItem");
const LvCustomerProfileWishlistItem = require("components/LvCustomerProfileWishlistItem");
const Router = require("sf-core/ui/router");
const customerService = require("service/Customer");
const adjustHeaderBar = require("../lib/adjustHeaderBar");

const PgCustomerProfile = extend(PgCustomerProfileDesign)(
	// Constructor
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		loadUI.call(this);
		pageContextPatch(this, "pgCustomerProfile");

		this.shoppingBag.onPress = function() {
			Router.go("pgShoppingBag");
		};
		this.lookBook.onPress = function() {
			Router.go("pgMainLookbook");
		};
		this.flHeaderLeft.onTouchEnded = function() {
			Router.goBack();
		};
		this.imgLookbook.onTouchEnded = function() {
			Router.go("pgMainLookbook");
		};
		this.imgShoppingBag.onTouchEnded = function() {
			Router.go("pgShoppingBag");
		};
		this.scw.subscribeContext = function(e) {
			if (e.type == "new-styles") {
				if (e.data["layoutHeight"]) {
					this.layout.height = e.data["layoutHeight"];
				}

			}
		}.bind(this.scw);
	});

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	const page = this;
	superOnLoad();
	adjustHeaderBar(page);
}

function addInfo(json) {
	var userInfoCard = this.profileHeader;
	var info = json.info;
	var traits = json.traits;

	userInfoCard.name.text = info.name;
	userInfoCard.date.text = "January 10th 2017"; // TODO
	this.lblEngagementScore.text = traits.engamentScore;
	this.lblLoyaltyPoints.text = traits.loyalityPoints;

	this.joined.title.text = "Joined";
	this.joined.text.text = "June 15th 17"; // TODO

	this.perVisit.title.text = "Spend per visit";
	this.perVisit.text.text = traits.spendsPerVisit.currency + " " + traits.spendsPerVisit.amount;

	this.lastPurchase.title.text = "Last purchase date";
	this.lastPurchase.text.text = "June 26th 17"; // TODO

	this.store.title.text = "Prefered store";
	this.store.text.text = traits.preferedStore;

	this.job.title.text = "Job";
	this.job.text.text = info.job;

	this.brands.title.text = "Most liked brands";
	this.brands.text.text = traits.mostLikedBrands.join(", ");

	this.interest.title.text = "Interests";
	this.interest.text.text = traits.interests.join(", ");
}

function addWardrobe(items) {
	this.swWardrobe.layout.removeAll();
	items.forEach(item => {
		var fl = new FlWardrobe({
			marginRight: 20,
			width: 300,
			height: 150
		}, {
			image: item.image,
			price: item.price.currency + " " + item.price.amount,
			name: item.name,
			model: item.productId
		});
		this.swWardrobe.layout.addChild(fl);
	});
}

/**
 *  "status": "In Transit",
 *  "type": "Online Order",
 *  "date": "2017-12-03T00:00:00.000Z"
 */
function addReservations(items) {
	this.scFlReservations.layout.removeAll();
	items.forEach(item => {
		var fl = new FlCustomerProfileReservationItem({
			width: 140,
			height: 50,
			marginRight: 20
		}, item);
		this.scFlReservations.layout.addChild(fl);
	});
	this.scFlReservations.layout.width = 170 * items.length;
}

function addOpenIncidents(items) {
	this.scwIndicates.layout.removeAll();
	items.forEach(item => {
		var fl = new FlCustomerProfileReservationItem({
			width: 140,
			height: 50,
			marginRight: 20
		}, item);
		this.scwIndicates.layout.addChild(fl);
	});
	this.scwIndicates.layout.width = 170 * items.length;
}

function addWishlistItems(items) {
	this.wishlistScw.layout.removeAll();
	items.forEach(item => {
		var fl = new LvCustomerProfileWishlistItem({
			width: 130,
			height: 240,
			marginRight: 20
		}, {
			image: item.image,
			price: item.price.currency + " " + item.price.amount,
			name: item.name,
			model: item.productId
		});
		this.wishlistScw.layout.addChild(fl);
	});
	this.wishlistScw.layout.width = 150 * items.length;
}

function loadUI() {
	const json = require("../sample-data/customerProfile.json");
	addInfo.call(this, json);
	addWardrobe.call(this, json.wardrobe);
	addReservations.call(this, json.reservations);
	addOpenIncidents.call(this, json.openIncidents);
	addWishlistItems.call(this, json.whishlist);
}

module && (module.exports = PgCustomerProfile);
