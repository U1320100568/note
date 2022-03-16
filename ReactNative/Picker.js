import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PopupModal from './Modal';
import {Picker as RNPicker} from '@react-native-picker/picker';
import {Platform} from 'react-native';
import {Color} from '../constants';

const defaultConfig = {
  itemWidth: 200,
  itemHeight: 60,
  fontSize: 18,
};

class Picker extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedValue: '',
    };
  }

  render() {
    const title = this.title || 'Title';
    const options = this.options || [
      'Do',
      'You',
      'Forget',
      'To',
      'Pass',
      'Options?',
    ];
    const allowBlank = this.allowBlank;

    return (
      <PopupModal
        ref={this._onRef}
        popupStyle={{
          maxHeight: Dimensions.get('window').height - 80,
          height: 300, // 32: per option height, 52: header height, 12: bottom padding, 18: bottom padding offset
          borderRadius: 0,
          left: 0,
          padding: 0,
          right: 0,
          bottom: 8,
        }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.ref && this.ref.close()}>
            <Text>取消</Text>
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity
            onPress={() => this.onSelect(this.state.selectedValue)}>
            <Text style={{color: Color.orange}}>確定</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' ? (
          <RNPicker
            selectedValue={this.state.selectedValue}
            style={{paddingBottom: 40}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({selectedValue: itemValue})
            }>
            <RNPicker.Item label={'請選擇'} value={''} />
            {options.map((option, idx) => (
              <RNPicker.Item
                key={idx}
                label={this._getLabel(option)}
                value={this._getValue(option)}
              />
            ))}
          </RNPicker>
        ) : (
          <ScrollView style={{paddingBottom: 20}}>
            <TouchableOpacity
              onPress={() => allowBlank && this.setState({selectedValue: ''})}>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontSize: 16,
                  textAlign: 'center',
                  color:
                    this.state.selectedValue === ''
                      ? 'rgb(41,41,41)'
                      : '#d4d4d4',
                  fontWeight: this.state.selectedValue === '' ? '800' : '300',
                }}>
                請選擇
              </Text>
            </TouchableOpacity>
            {options.map((option) => (
              <TouchableOpacity
                onPress={() =>
                  this.setState({selectedValue: this._getValue(option)})
                }>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 16,
                    textAlign: 'center',
                    color:
                      this.state.selectedValue === this._getValue(option)
                        ? 'rgb(41,41,41)'
                        : 'rgb(157,157,157)',
                    fontWeight:
                      this.state.selectedValue === this._getValue(option)
                        ? '800'
                        : '300',
                  }}>
                  {this._getLabel(option)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </PopupModal>
    );
  }

  _getLabel = (option) => {
    return typeof option === 'object' ? option.label : option;
  };

  _getValue = (option) => {
    return typeof option === 'object' ? option.value : option;
  };

  _onRef = (ref) => {
    this.ref = ref;
    if (ref) {
      this.open = ({
        value,
        options,
        onSelect,
        allowBlank = true,
        ...extraConfig
      } = {}) => {
        this.options = options;
        this.onSelect = onSelect;
        this.allowBlank = allowBlank;
        this.config = {
          ...defaultConfig,
          ...extraConfig,
        };
        this.setState({selectedValue: value}, () => {
          ref.open();
        });
      };
      this.close = ref.close;
    }
  };
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(250,250,248)',
  },
});

export default Picker;
