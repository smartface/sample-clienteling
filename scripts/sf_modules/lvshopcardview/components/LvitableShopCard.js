const extend = require('js-base/core/extend');
const LvitableShopCardDesign = require('library/LvitableShopCard');
const touch = require("sf-extension-utils/lib/touch");

const data = [{
        iconUrl: "https://picsum.photos/55/80/?690",
        title: "Eric Rohs",
        subTitle: "Abanda Travel Book",
        rank: 78,
        cost: 120,
        starCount: 3,
        currencySymbol: "$"
    },
    {
        iconUrl: "https://picsum.photos/55/80/?670",
        title: "Martin Cruzo",
        subTitle: "Mexico Travel Guide",
        rank: 41,
        cost: 341,
        starCount: 1,
        currencySymbol: "$"
    },
    {
        iconUrl: "https://picsum.photos/55/80/?1075",
        title: "Pele Anderson",
        subTitle: "Ashland City Holiday",
        rank: 31,
        cost: 67,
        starCount: 2,
        currencySymbol: "$"
    },
    {
        iconUrl: "https://picsum.photos/55/80/?1078",
        title: "Eliysa Smith",
        subTitle: "London Travel Guide",
        rank: 81,
        cost: 10,
        starCount: 4,
        currencySymbol: "$"
    }

];

const LvitableShopCard = extend(LvitableShopCardDesign)(
    // Constructor
    function(_super, props = {}, pageName) {
        // Initalizes super class for this scope
        _super(this, props);
        this.pageName = pageName;
        this.refreshEnabled = false;

        let __data = data;
        this.onButtonTouched = props.onButtonTouched;
        this.onLayoutTouched = props.onLayoutTouched;

        this.updateData = (data) => {
            __data = data;
            this.itemCount = data.length;
            this.refreshData();
        };

        this.onRowBind = (item, index) => {
            __data[index] && (item.data = __data[index]);

            touch.addPressEvent(item.flShopCard.lblCost, () => {
                this.onButtonTouched && this.onButtonTouched(item, index);
            }, { consumeTouch: true });

            touch.addPressEvent(item.flShopCard, () => {
                this.onLayoutTouched && this.onLayoutTouched(item, index);
            });
        };

    }
);

module.exports = LvitableShopCard;
