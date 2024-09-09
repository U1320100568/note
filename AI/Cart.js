import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import Button from '../Button';
import useOrderType from '../../Hooks/useOrderType';
import Theme from '../../Theme';
import {useOutlet} from 'reconnect.js';
import * as AppActions from '../../AppActions';
import QuantityVariant from '../ProductDetail2/QuantityVariant';
import ProductDetail from '../ProductDetail2';
import * as LayaCartUtil from '../../Utils/LayaCartUtil';
import * as CartUtil from '../../Utils/CartUtil';
import * as StationUtil from '../../Utils/StationUtil';
import DrinksVariant from '../ProductDetail2/DrinksVariant';
import DrinkVariantDetail from '../ProductDetail2/DrinkVariantDetail';
import DiscountPanel from '../DiscountPanel';
import SelectTable from '../../Components/SelectTable';
import SwipeableItem from '../SwipeableItem';
import useProducts from '../../Hooks/useProducts';
import StatusTag from '../StatusTag';
import errorHandler from '../../Utils/ErrorUtil';
import ItemPrintPanel from './PrintPanel';
import NotePanel from '../NotePanel';
import layoutAnimConfig from '../../LayoutAnimConfig';

export default function Cart({
  cart,
  inFrontDesk = false,
  inOrderList = false,
  inOrderDetail = false,
  inStation = false,
  station, // for inStation
  bag, // for inFrontDesk
  setBag, // for inFrontDesk
}) {
  const order = cart.order_id ? cart : null;
  const [user] = useOutlet('user');
  const {products} = useProducts();
  const stations = user.store?.stations || [];

  async function editCart({
    cartItemIdx,
    qty,
    product,
    variants,
    drink,
    add_on,
    bag,
    note,
  }) {
    AppActions.setLoading(true);
    try {
      await LayaCartUtil.editItem(cartItemIdx, {
        product,
        qty,
        variants,
        drink,
        add_on,
        bag,
        note,
      });
    } catch (ex) {
      errorHandler(ex);
    }
    AppActions.setLoading(false);
  }

  async function editDiscount(params) {
    AppActions.setLoading(true);
    try {
      await LayaCartUtil.editDiscount(params);
    } catch (ex) {
      errorHandler(ex);
    }
    AppActions.setLoading(false);
  }

  async function turnItemDone({index, part}) {
    AppActions.setLoading(true);
    try {
      let data = {...(order.revtel_pos?.stations || {})};
      let stationData =
        data[station.name] ||
        Array.from(Array(order.items.length)).map(() => ({}));

      stationData[index] = {
        ...stationData[index],
        [part]: true,
      };
      data[station.name] = stationData;

      let _order = await AppActions.setOrderPosStatus({
        order,
        stations: data,
      });
      LayoutAnimation.configureNext(layoutAnimConfig);
    } catch (e) {
      errorHandler(e);
    }
    AppActions.setLoading(false);
  }

  async function openItemPrintPanel({item}) {
    try {
      await AppActions.modal({
        title: '',
        initValues: item,
        render: args => <ItemPrintPanel {...args} order={order} />,
      });
    } catch (error) {}
  }

  const bags = React.useMemo(() => {
    return cart.items.reduce((sum, item, item_index) => {
      let name = item.bag || 1;
      sum[name] = [...(sum[name] || []), {...item, item_index}];
      return sum;
    }, {});
  }, [cart]);

  return (
    <React.Fragment>
      {inFrontDesk ? (
        <Button
          mode="contained"
          color={Theme.colors.green}
          style={{justifyContent: 'flex-start'}}
          onPress={async () => {
            try {
              let {discount_value, name} = await AppActions.modal({
                title: '折價',
                initValues: {},
                render: args => <DiscountPanel {...args} total={cart.total} />,
                // height: 900,
                // width: 500,
              });

              AppActions.setLoading(true);

              await LayaCartUtil.editDiscount({
                type: 'ORDER_DISCOUNT',
                name,
                discount_value,
              });
            } catch (error) {}
            AppActions.setLoading(false);
          }}>
          訂單折扣{' '}
          {(cart.pos_discount_items || [])
            .filter(x => x.type === 'ORDER_DISCOUNT')
            .map(x => `${x.name} (-$${x.discount_value})`)
            .join(',')}
        </Button>
      ) : null}

      {order ? (
        <React.Fragment>
          {(inOrderList || inOrderDetail) &&
          (cart?.pos_discount_items || []).filter(
            x => x.type === 'ORDER_DISCOUNT',
          )?.length > 0 ? (
            <Text style={styles.price}>
              訂單折扣
              {(cart.pos_discount_items || [])
                .filter(x => x.type === 'ORDER_DISCOUNT')
                .map(x => `${x.name} (-$${x.discount_value})`)
                .join(',')}
            </Text>
          ) : null}
          {cart?.discount_items?.length > 0 ? (
            <Text style={styles.price}>
              促銷活動 -
              {cart.discount_items.reduce((sum, x) => {
                sum += x.discount_value;
                return sum;
              }, 0)}
            </Text>
          ) : null}

          {cart.uber_direct_fee ? (
            <Text style={styles.price}>外送費{cart.uber_direct_fee}</Text>
          ) : null}
        </React.Fragment>
      ) : null}

      {Object.keys(bags).map(name => {
        let items = bags[name];

        return (
          <React.Fragment key={name.toString()}>
            <Button
              mode="contained"
              align="left"
              color={bag === parseInt(name) ? Theme.colors.main : '#bbb'}
              style={{justifyContent: 'flex-start'}}
              onPress={() => {
                if (inFrontDesk) {
                  setBag(parseInt(name));
                }
              }}>
              {'No.' +
                name +
                ', ' +
                items.reduce((sum, x) => {
                  sum +=
                    x.qty * (1 + (x.drink ? 1 : 0) + (x.add_on ? 1 : 0)) +
                    (x.variants?.set && !['無', 'none'].includes(x.variants.set)
                      ? 1
                      : 0);
                  return sum;
                }, 0) +
                '項, $' +
                (items.reduce((sum, x) => {
                  sum += x.total;
                  return sum;
                }, 0) +
                  (cart?.pos_discount_items || [])
                    .filter(x =>
                      items.map(item => item.item_index).includes(x.item_index),
                    )
                    .reduce((sum, x) => {
                      sum -= x.discount_value;
                      return sum;
                    }, 0)) +
                (name === '1'
                  ? ', 共' +
                    cart.items.reduce((sum, x) => {
                      sum +=
                        x.qty * (1 + (x.drink ? 1 : 0) + (x.add_on ? 1 : 0)) +
                        (x.variants?.set &&
                        !['無', 'none'].includes(x.variants.set)
                          ? 1
                          : 0);
                      return sum;
                    }, 0) +
                    '項'
                  : '')}
            </Button>

            {items.map(item => {
              // item is not included in station, simply show a dummy ui to keep the "idx" order
              const cartItemIdx = item.item_index;
              const discounts = (cart?.discount_items || []).filter(
                x => x.detail?.item_index === cartItemIdx,
              );
              const pos_discounts = (cart?.pos_discount_items || []).filter(
                x => x.item_index === cartItemIdx,
              );
              const parts = CartUtil.flatCartItem(item, products);
              const setName =
                !!item.variants?.set && item.variants?.set !== 'none'
                  ? item.variants?.set
                  : '';

              return (
                <React.Fragment key={`${name}${cartItemIdx}`}>
                  {/* main */}
                  {inStation &&
                  station &&
                  StationUtil.itemStatusOfStation({
                    index: cartItemIdx,
                    item: parts['main'],
                    part: 'main',
                    station,
                    orderStations: order.revtel_pos?.stations,
                  }) ? null : (
                    <SwipeableItem
                      disabled={!inFrontDesk}
                      rightActions={[
                        {
                          text: '備註',
                          color: '#999',
                          onPress: async () => {
                            try {
                              let note = await AppActions.modal({
                                title: '編輯備註',
                                initValues: item.note,

                                render: args => <NotePanel {...args} />,
                              });

                              editCart({
                                ...item,
                                note,
                                cartItemIdx,
                              });
                            } catch (error) {}
                          },
                        },
                        {
                          text: '數量',
                          color: '#aaa',
                          onPress: async () => {
                            try {
                              let qty = await AppActions.modal({
                                title: '編輯數量',
                                initValues: item.qty,
                                render: args => <QuantityVariant {...args} />,
                              });

                              editCart({
                                ...item,
                                qty,
                                cartItemIdx,
                              });
                            } catch (error) {}
                          },
                        },
                        {
                          text: '折價',
                          color: '#bbb',
                          onPress: async () => {
                            try {
                              let {discount_value, name} =
                                await AppActions.modal({
                                  title: '折價',
                                  initValues: {},
                                  render: args => (
                                    <DiscountPanel
                                      {...args}
                                      total={item.total}
                                    />
                                  ),
                                });

                              editDiscount({
                                type: 'ITEM_DISCOUNT',
                                item_index: cartItemIdx,
                                name,
                                discount_value,
                              });
                            } catch (error) {}
                          },
                        },
                        {
                          text: '刪除',
                          color: '#ccc',
                          onPress: async () => {
                            AppActions.setLoading(true);
                            try {
                              await LayaCartUtil.removeItem(cartItemIdx);
                              LayoutAnimation.configureNext(layoutAnimConfig);
                            } catch (ex) {
                              console.warn(ex);
                            }
                            AppActions.setLoading(false);
                          },
                        },
                      ]}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.item}
                        onPress={async () => {
                          if (inFrontDesk) {
                            try {
                              let {variants, drink} = await AppActions.modal({
                                title: '編輯商品',
                                initValues: {
                                  variants: item.variants || {},
                                  drink: item.drink,
                                },
                                render: args => (
                                  <ProductDetail
                                    {...args}
                                    product={item.product}
                                  />
                                ),
                              });

                              editCart({
                                ...item,
                                cartItemIdx,
                                variants,
                                drink,
                              });
                            } catch (error) {}
                          } else if (inStation) {
                            turnItemDone({index: cartItemIdx, part: 'main'});
                          } else if (inOrderList) {
                            openItemPrintPanel({item: parts['main']});
                          }
                        }}>
                        <View style={{flex: 1}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 18, flex: 1}}>
                              {item.product.name}{' '}
                              {item.qty > 1 && 'x' + item.qty}
                            </Text>
                            <Text
                              style={{fontSize: 18, color: Theme.colors.red}}>
                              {item.total -
                                discounts.reduce((sum, x) => {
                                  sum += x.discount_value;
                                  return sum;
                                }, 0) -
                                pos_discounts.reduce((sum, x) => {
                                  sum += x.discount_value;
                                  return sum;
                                }, 0)}
                            </Text>
                          </View>
                          <Text style={{color: Theme.colors.red}}>
                            {pos_discounts
                              .map(x => x.name + '(-$' + x.discount_value + ')')
                              .join(',')}
                            {CartUtil.getItemSummary(item, {
                              hidePrice: true,
                            })}{' '}
                            {item.note}
                          </Text>
                          {(inOrderList || inOrderDetail) && (
                            <View style={{flexDirection: 'row'}}>
                              {StationUtil.getStationsByItem({
                                stations,
                                item,
                              }).map(s => (
                                <StatusTag
                                  key={s.name}
                                  color={
                                    StationUtil.itemStatusOfStation({
                                      index: cartItemIdx,
                                      item,
                                      part: 'main',
                                      station: s,
                                      orderStations: order.revtel_pos?.stations,
                                    })
                                      ? Theme.colors.green
                                      : '#ccc'
                                  }>
                                  {s.name}
                                </StatusTag>
                              ))}
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </SwipeableItem>
                  )}
                  {/* drink */}
                  {!item.drink ? null : inStation &&
                    station &&
                    StationUtil.itemStatusOfStation({
                      index: cartItemIdx,
                      item: parts['drink'],
                      part: 'drink',
                      station,
                      orderStations: order.revtel_pos?.stations,
                    }) ? null : (
                    <SwipeableItem
                      disabled={!inFrontDesk}
                      rightActions={[
                        {
                          text: '更換飲料',
                          color: '#aaa',
                          onPress: async () => {
                            try {
                              let drink = await AppActions.modal({
                                title: '更換飲料',
                                initValues: item.drink || {},
                                render: args => (
                                  <DrinksVariant
                                    {...args}
                                    product={item.product}
                                    selectedSet={item.variants.set}
                                  />
                                ),
                              });
                              editCart({
                                ...item,
                                cartItemIdx,
                                drink,
                              });
                            } catch (error) {}
                          },
                        },
                      ]}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.item}
                        onPress={async () => {
                          if (inFrontDesk) {
                            try {
                              let variants = await AppActions.modal({
                                title: '編輯飲料',
                                initValues: item.drink.variants || {},
                                render: args => (
                                  <DrinkVariantDetail
                                    {...args}
                                    drink={item.drink.product}
                                    product={item.product}
                                    selectedSet={item.variants.set}
                                  />
                                ),
                              });
                              editCart({
                                ...item,
                                cartItemIdx,
                                drink: {
                                  ...item.drink,
                                  variants,
                                },
                              });
                            } catch (error) {}
                          } else if (inStation) {
                            turnItemDone({index: cartItemIdx, part: 'drink'});
                          } else if (inOrderList) {
                            openItemPrintPanel({item: parts['drink']});
                          }
                        }}>
                        <View style={{flex: 1}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 18, flex: 1}}>
                              {item.drink.product.name}{' '}
                              {item.qty > 1 && 'x' + item.qty}
                            </Text>
                            {/* <Text
                              style={{fontSize: 18, color: Theme.colors.red}}>
                              {CartUtil.getDrinkPriceOfSet(
                                item.variants?.set,
                                item.drink?.product?.price,
                                item.product?.variants,
                              )}
                            </Text> */}
                          </View>
                          <Text style={{color: Theme.colors.red}}>
                            {CartUtil.getItemSummary(item.drink, {
                              hidePrice: true,
                            })}{' '}
                            {item.note} {setName ? '(套餐 ' + ')' : ''}
                          </Text>
                          {(inOrderList || inOrderDetail) && (
                            <View style={{flexDirection: 'row'}}>
                              {StationUtil.getStationsByItem({
                                stations,
                                item: item.drink,
                              }).map(s => (
                                <StatusTag
                                  key={s.name}
                                  color={
                                    StationUtil.itemStatusOfStation({
                                      index: cartItemIdx,
                                      item: item.drink,
                                      part: 'drink',
                                      station: s,
                                      orderStations: order.revtel_pos?.stations,
                                    })
                                      ? Theme.colors.green
                                      : '#ccc'
                                  }>
                                  {s.name}
                                </StatusTag>
                              ))}
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </SwipeableItem>
                  )}

                  {!parts['associate_product'] ? null : inStation &&
                    station &&
                    StationUtil.itemStatusOfStation({
                      index: cartItemIdx,
                      item: parts['associate_product'],
                      part: 'associate_product',
                      station,
                      orderStations: order.revtel_pos?.stations,
                    }) ? null : (
                    <View>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.item}
                        onPress={() => {
                          if (inStation) {
                            turnItemDone({
                              index: cartItemIdx,
                              part: 'associate_product',
                            });
                          } else if (inOrderList) {
                            openItemPrintPanel({
                              item: parts['associate_product'],
                            });
                          }
                        }}>
                        <View style={{flex: 1}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 18, flex: 1}}>
                              {parts['associate_product'].product?.name}{' '}
                              {item.qty > 1 && 'x' + item.qty}
                            </Text>
                            {/* <Text
                              style={{fontSize: 18, color: Theme.colors.red}}>
                              0
                            </Text> */}
                          </View>
                          <Text style={{color: Theme.colors.red}}>
                            {CartUtil.getItemSummary(
                              parts['associate_product'],
                              {
                                hidePrice: true,
                              },
                            )}{' '}
                            {item.note} {setName ? '(套餐 ' + ')' : ''}
                          </Text>
                          {(inOrderList || inOrderDetail) && (
                            <View style={{flexDirection: 'row'}}>
                              {StationUtil.getStationsByItem({
                                stations,
                                item: parts['associate_product'],
                              }).map(s => (
                                <StatusTag
                                  key={s.name}
                                  color={
                                    StationUtil.itemStatusOfStation({
                                      index: cartItemIdx,
                                      item: parts['associate_product'],
                                      part: 'associate_product',
                                      station: s,
                                      orderStations: order.revtel_pos?.stations,
                                    })
                                      ? Theme.colors.green
                                      : '#ccc'
                                  }>
                                  {s.name}
                                </StatusTag>
                              ))}
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  {!item.add_on ? null : inStation &&
                    station &&
                    StationUtil.itemStatusOfStation({
                      index: cartItemIdx,
                      item: parts['add_on'],
                      part: 'add_on',
                      station,
                      orderStations: order.revtel_pos?.stations,
                    }) ? null : (
                    <View>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.item}
                        onPress={() => {
                          if (inStation) {
                            turnItemDone({index: cartItemIdx, part: 'add_on'});
                          } else if (inOrderList) {
                            openItemPrintPanel({item: parts['add_on']});
                          }
                        }}>
                        <View style={{flex: 1}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 18, flex: 1}}>
                              (加購){item.add_on.product?.name}{' '}
                              {item.qty > 1 && 'x' + item.qty}
                            </Text>
                            <Text
                              style={{fontSize: 18, color: Theme.colors.red}}>
                              0
                            </Text>
                          </View>
                          <Text style={{color: Theme.colors.red}}>
                            {CartUtil.getItemSummary(item.add_on, {
                              hidePrice: true,
                            })}{' '}
                            {item.note}
                          </Text>
                          {(inOrderList || inOrderDetail) && (
                            <View style={{flexDirection: 'row'}}>
                              {StationUtil.getStationsByItem({
                                stations,
                                item: item.add_on,
                              }).map(s => (
                                <StatusTag
                                  key={s.name}
                                  color={
                                    StationUtil.itemStatusOfStation({
                                      index: cartItemIdx,
                                      item: item.add_on,
                                      part: 'add_on',
                                      station: s,
                                      orderStations: order.revtel_pos?.stations,
                                    })
                                      ? Theme.colors.green
                                      : '#ccc'
                                  }>
                                  {s.name}
                                </StatusTag>
                              ))}
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}

      {inFrontDesk && bag > Object.values(bags).length ? (
        <Button
          mode="contained"
          align="left"
          color={
            bag === Object.values(bags).length + 1 ? Theme.colors.main : '#bbb'
          }
          onPress={() => setBag(Object.values(bags).length + 1)}
          style={{justifyContent: 'flex-start'}}>
          No.{bag}, 請按菜單新增品項
        </Button>
      ) : null}

      {inFrontDesk ? (
        <Button
          mode="contained"
          align="left"
          color={Theme.colors.green}
          onPress={() => setBag(Object.values(bags).length + 1)}>
          新增分袋包裝
        </Button>
      ) : null}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: Theme.colors.border,
    borderBottomWidth: 1,
    backgroundColor: Theme.colors.white,
  },
  price: {
    padding: 10,
    backgroundColor: Theme.colors.main,
    color: '#fff',
    fontSize: 18,
  },
});
