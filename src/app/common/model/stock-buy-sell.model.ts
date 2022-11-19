export class StockBuySellModel {
    date: Date;
    symbol: string;
    priceHigh: number;
    priceLow: number;
    priceOpen: number;
    priceAverage: number;
    priceClose: number;
    priceBasic: number;
    totalVolume: number;
    dealVolume: number;
    putthroughVolume: number;
    totalValue: number;
    putthroughValue: number;
    buyForeignQuantity: number;
    buyForeignValue: number;
    sellForeignQuantity: number;
    sellForeignValue: number;
    buyCount: number;
    buyQuantity: number;
    sellCount: number;
    sellQuantity: number;
    adjRatio: number;
    currentForeignRoom: number;
    propTradingNetDealValue: number;
    propTradingNetPTValue: number;
    propTradingNetValue: number;
}
