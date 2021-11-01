import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            scanned: false,
            hasCameraPermissions: '',
            scannedBookId: '',
            scannedStudentId: '',
            buttonState: "normal"
        }
    }

    getCameraPermissions = async (id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: id,
            scanned: false
        })
    }

    handleBarCodeScanned = async ({ type, data }) => {
        const { buttonState } = this.state;
        if (buttonState === "bookId") {
            this.setState({
                scanned: true,
                scannedBookId: 'data',
                buttonState: "normal"
            })
        }
        else if (buttonState === "studentId") {
            this.setState({
                scanned: true,
                scannedStudentId: 'data',
                buttonState: "normal"
            })
        }
    }


    render() {
        const hcp = this.state.hasCameraPermissions;
        const bs = this.state.buttonState;
        const sc = this.state.scanned;
        if (bs !== "normal" && hcp) {
            return (
                <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={sc ? undefined : this.handleBarCodeScanned}
                />
            )
        }
        else if (bs === "normal") {
            return (
                <View style={styels.container}>
                    <View>
                        <Image
                            source={require("../assets/booklogo.jpg")}
                            style={{ width: 200, height: 200 }}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Book Id"
                            value={this.state.scannedBookId}
                        />
                        <TouchableOpacity
                            style={styles.scanButton}
                            onPress={() => {
                                this.getCameraPermissions("bookId");
                            }}
                        >
                            <Text style={styles.buttonText} >Scan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Student Id"
                            value={this.state.scannedStudentId}
                        />
                        <TouchableOpacity
                            style={styles.scanButton}
                            onPress={() => {
                                this.getCameraPermissions("studentId");
                            }}
                        >
                            <Text style={styles.buttonText} >Scan</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.displayText}>
                        {hcp === true ? this.state.scannedData : "Request Camera Permissions"}
                    </Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },
    inputView: {
        flexDirection: 'row',
        margin: 20
    },
    inputBox: {
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
    },
    scanButton: {
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
    }
});