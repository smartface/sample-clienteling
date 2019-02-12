const extend = require('js-base/core/extend');
const LviItemShopCardDesign = require('library/LviItemShopCard');

const LviItemShopCard = extend(LviItemShopCardDesign)(
    // Constructor
    function(_super, props = {}, pageName) {
        // Initalizes super class for this scope
        _super(this, props);
        this.pageName = pageName;
        var data;
        Object.defineProperty(this, "data", {
            set: value => {
                data = value;
                this.flShopCard.tableImage = value.iconUrl;
                this.flShopCard.tableTitle = value.title;
                this.flShopCard.tableSubTitle = value.subTitle;
                this.flShopCard.tableRank = value.rank;
                this.flShopCard.tableCost = value.cost;
                this.flShopCard.currencySymbol = value.currencySymbol;
                this.flShopCard.tableStarCount = value.starCount;
            },
            get: () => data
        });

    }
);

module.exports = LviItemShopCard;
