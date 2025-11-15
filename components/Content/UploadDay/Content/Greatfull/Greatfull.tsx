import { useState } from 'react';
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { DecideDoIcon, EyeIcon, GreenForwardArrowIcon, TrashIcon, StarIcon, EmptyStarIcon } from '@/constants/Images';
import { grayphite, hothazel } from '@/constants/Colors';
import { specifyStringTruncate } from '@/utility/utilityValues';

interface props {
    day: any;
    setDay: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Greatfull: React.FC<props> = ({ day, setDay }) => {
    const greatfull = day?.greatfull;
    const threeWords = greatfull?.words;
    const threeGreatfull = greatfull?.greatfull;
    const cqcLink = greatfull.greatfull_cqc_link;
    const decideDoGratitude = greatfull.decide_do_gratitude;

    const [currCqc, setCurrCqc] = useState<string>('');
    const [selectedCqc, setSelectedCqc] = useState<string>('');
    const [selectedDoDiffDoOver, setSelectedDoDiffDoOver] = useState<string>('');

    const [currWords, setCurrWords] = useState<string>('');
    const [currGreatfull, setCurrGreatfull] = useState<string>('');
    const [currDoDiffDoOver, setCurrDoDiffDoOver] = useState<string>('');
    const [currDoDiff, setCurrDoDiff] = useState<string>('');
    const [currDoOver, setCurrDoOver] = useState<string>('');

    const updateWords = (text: string) => {
        if (text.includes('nigger')) {
            setCurrWords('');
            return;
        }
        setCurrWords(text.replace(/\s/g, ''));
    };

    const updateCqc = (text: string) => {
        if (text.includes('nigger')) {
            setCurrCqc('');
            return;
        }
        setCurrCqc(text);
    };

    const selectCqc = (text: string) => {
        console.log('text', text);
        console.log('selectedCqc', selectedCqc);
        if (selectedCqc.trim() === text.trim()) {
            setSelectedCqc('');
        } else {
            setSelectedCqc(text);
        }
    };

    const deleteCqc = () => {
        let clone = { ...day };
        let greatfullClone = clone?.greatfull;
        greatfullClone.concern = null;
        greatfullClone.question = null;
        greatfullClone.criticism = null;
        clone.greatfull = greatfullClone;
        setSelectedCqc('');
        setDay(clone);
    };

    const submitCqc = () => {
        console.log('selectedCqc', selectedCqc);
        console.log('currCqc', currCqc);
        let clone = { ...day };
        let greatfullClone = clone?.greatfull;
        if (selectedCqc === 'concern.') {
            console.log("yeah it's concern.");
            greatfullClone.concern = currCqc;
            greatfullClone.question = null;
            greatfullClone.criticismn = null;
        } else if (selectedCqc === 'question?') {
            console.log('question?');
            greatfullClone.question = currCqc;
            greatfullClone.concern = null;
            greatfullClone.criticismn = null;
        } else if (selectedCqc === 'criticism!') {
            console.log('criticism!');
            greatfullClone.criticism = currCqc;
            greatfullClone.concern = null;
            greatfullClone.question = null;
        } else {
            return;
        }
        clone.greatfull = greatfullClone;
        setSelectedCqc('');
        setDay(clone);
    };

    const updateGreatfull = (text: string) => {
        if (text.includes('nigger')) {
            setCurrGreatfull('');
            return;
        }
        setCurrGreatfull(text);
        // setCurrGreatfull('');
    };

    const submitCurrentWord = () => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };
        if (Array.isArray(greatfullClone?.words)) {
            greatfullClone.words.push(currWords);
        }
        dayClone.greatfull = greatfullClone;
        setCurrWords('');
        setDay(dayClone);
    };
    const deleteLastWord = () => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };
        if (Array.isArray(greatfullClone?.words)) {
            greatfullClone.words.pop();
        }
        dayClone.greatfull = greatfullClone;
        setDay(dayClone);
        setCurrWords('');
    };

    const updateZoomIn = (text: string) => {
        if (text.includes('nigger')) {
            setCurrDoDiff('');
            return;
        }
        setCurrDoDiff(text);
    };

    const updateZoomOut = (text: string) => {
        if (text.includes('nigger')) {
            setCurrDoOver('');
            return;
        } else {
            setCurrDoOver(text);
        }
    };

    const submitZoomIn = () => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };
        greatfullClone.zoom_in = currDoDiff;
        dayClone.greatfull = greatfullClone;
        setCurrDoDiff('');
        setDay(dayClone);
    };

    const submitZoomOut = () => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };
        greatfullClone.zoom_out = currDoDiff;
        setCurrDoOver('');
        setDay(dayClone);
    };

    const submitDoDiffDoOver = () => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };

        if (currDoDiffDoOver === 'do diff') {
            // greatfullClone.zoom_in = curr
        }
    };

    const submitGreatfull = () => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };
        console.log('greatfullClone', greatfullClone);
        if (Array.isArray(greatfullClone?.greatfull)) {
            console.log('yaoo');
            greatfullClone.greatfull.push(currGreatfull);
        }
        dayClone.greatfull = greatfullClone;
        console.log('dayClone', dayClone);
        setDay(dayClone);
        setCurrGreatfull('');
    };
    const deleteGreatfull = () => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };
        if (Array.isArray(greatfullClone?.greatfull)) {
            greatfullClone.greatfull.pop();
        }
        dayClone.greatfull = greatfullClone;
        setDay(dayClone);
        setCurrWords('');
    };

    const addGreatfullCqcLink = (index: number) => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };

        const currGreatfull = threeGreatfull[index] || null;
        console.log('currGreatfull', currGreatfull);
        if (currGreatfull) {
            console.log('currGreatfull', currGreatfull);
            if (cqcLink?.includes(currGreatfull)) {
                const sortedCqcLink = cqcLink?.filter((cqc: any) => cqc !== currGreatfull);
                console.log('sortedCqcLink', sortedCqcLink);
                greatfullClone.greatfull_cqc_link = sortedCqcLink;
            } else {
                greatfullClone.greatfull_cqc_link.push(currGreatfull);
            }
            dayClone.greatfull = greatfullClone;
            setDay(dayClone);
        }
    };

    const addGreatfullDecideDo = (index: number) => {
        let dayClone = { ...day };
        let greatfullClone: any = { ...dayClone?.greatfull };

        const currGreatfull = threeGreatfull[index] || null;
        if (currGreatfull) {
            console.log('currGreatfull', currGreatfull);
            if (decideDoGratitude?.includes(currGreatfull)) {
                const sortedCqcLink = decideDoGratitude?.filter((gratitude: any) => gratitude !== currGreatfull);
                greatfullClone.decide_do_gratitude = sortedCqcLink;
            } else {
                greatfullClone.decide_do_gratitude.push(currGreatfull);
            }
            dayClone.greatfull = greatfullClone;
            setDay(dayClone);
        }
    };

    const test = () => {
        console.log('currGreatfull', currGreatfull);
        console.log('day', day);
    };

    const selectDoDiffDoOver = (text: string) => {
        console.log('text', text);
        console.log('selectedCqc', selectedCqc);
        if (selectedDoDiffDoOver.trim() === text.trim()) {
            setSelectedDoDiffDoOver('');
        } else {
            setSelectedDoDiffDoOver(text);
        }
    };

    const updateDoDiffDoOver = (text: string) => {
        if (text.includes('nigger')) {
            setCurrDoDiffDoOver('');
            return;
        }
        setCurrDoDiffDoOver(text);
    };

    return (
        <View style={styles.cont}>
            <View style={styles.cont}>
                <View style={styles.inputOutputContRow}>
                    {selectedCqc !== '' && (
                        <TouchableOpacity onPress={deleteCqc}>
                            <Image style={styles.icon} source={TrashIcon} />
                        </TouchableOpacity>
                    )}

                    {selectedCqc !== '' && <TextInput maxLength={50} value={currCqc} onChangeText={(text: any) => updateCqc(text)} style={styles.input2} />}

                    <TouchableOpacity onPress={() => selectCqc('concern.')}>
                        <Text style={[{ color: selectedCqc === 'concern.' ? hothazel : grayphite }, styles.text]}> concern. </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectCqc('question?')}>
                        <Text style={[{ color: selectedCqc === 'question?' ? hothazel : grayphite }, styles.text]}> question? </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectCqc('criticism!')}>
                        <Text style={[{ color: selectedCqc === 'criticism!' ? hothazel : grayphite }, styles.text]}> criticism! </Text>
                    </TouchableOpacity>

                    {
                        // (greatfull?.concern?.length || greatfull?.criticismn?.length || greatfull?.question?.length) &&
                        <TouchableOpacity onPress={submitCqc}>
                            <Image style={[{ marginLeft: 20 }, styles.icon]} source={GreenForwardArrowIcon} />
                        </TouchableOpacity>
                    }
                </View>

                <Text style={[{ color: hothazel }, styles.text]}> {currCqc || day?.greatfull?.concern || day?.greatfull?.criticism || day?.greatfull?.question} </Text>
            </View>

            <View style={styles.cont}>
                <View style={styles.inputOutputContRow}>
                    <TouchableOpacity onPress={deleteLastWord}>
                        <Image style={[{ marginLeft: 20 }, styles.icon]} source={TrashIcon} />
                    </TouchableOpacity>

                    <Text> words of the day: </Text>
                    <TextInput maxLength={11} value={currWords} onChangeText={(text: any) => updateWords(text)} style={styles.input2} />

                    {greatfull.words?.length !== 3 && (
                        <TouchableOpacity onPress={submitCurrentWord}>
                            <Image style={[{ marginLeft: 20 }, styles.icon]} source={GreenForwardArrowIcon} />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.inputOutputContRow}>
                    {day?.greatfull?.words[0] && <Text style={styles.text}> {day?.greatfull?.words[0]} </Text>}
                    {day?.greatfull?.words[1] && <Text style={styles.text}> {day?.greatfull?.words[1]} </Text>}
                    {day?.greatfull?.words[2] && <Text style={styles.text}> {day?.greatfull?.words[2]} </Text>}
                    {/* {day?.greatfull?.words[0] && <Text style={styles.text}> {day?.greatfull?.words[0]} </Text>}
                    {day?.greatfull?.words[1] && <Text style={styles.text}> {day?.greatfull?.words[1]} </Text>}
                    {day?.greatfull?.words[2] && <Text style={styles.text}> {day?.greatfull?.words[2]} </Text>} */}
                </View>
            </View>

            <View style={styles.cont}>
                <View style={styles.inputOutputContRow}>
                    <TouchableOpacity onPress={deleteGreatfull}>
                        <Image style={[{ marginLeft: 20 }, styles.icon]} source={TrashIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={test}>
                        {' '}
                        <Text> gratitude </Text>{' '}
                    </TouchableOpacity>
                    <TextInput maxLength={22} value={currGreatfull} onChangeText={(text: any) => updateGreatfull(text)} style={styles.input2} />

                    {day?.greatfull?.greatfull?.length < 3 && (
                        <TouchableOpacity onPress={submitGreatfull}>
                            <Image style={[{ marginLeft: 20 }, styles.icon]} source={GreenForwardArrowIcon} />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.inputOutputCont}>
                    {threeGreatfull?.map(
                        (item: any, index: number) =>
                            item && (
                                <View key={index} style={styles.inputOutputContRow}>
                                    <Text style={[{ color: Array.isArray(cqcLink) && cqcLink.includes(item) ? hothazel : '' }, styles.text]}>{item}</Text>

                                    {/* greatfull_cgc_link */}
                                    <TouchableOpacity
                                        style={[{ backgroundColor: Array.isArray(cqcLink) && cqcLink.includes(item) ? hothazel : '' }, styles.button]}
                                        onPress={() => addGreatfullCqcLink(index)}
                                    />

                                    {day?.decidedo?.decide?.length >= 2 && (
                                        <TouchableOpacity onPress={() => addGreatfullDecideDo(index)}>
                                            <Image
                                                style={[
                                                    { marginLeft: 20, opacity: Array.isArray(decideDoGratitude) && decideDoGratitude.includes(item) ? 1.0 : 0.25 },
                                                    styles.icon,
                                                ]}
                                                source={DecideDoIcon}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ),
                    )}
                </View>
            </View>

            <View style={styles.cont}>
                <View style={styles.inputOutputContRow}>
                    {selectedDoDiffDoOver !== '' && <TextInput maxLength={50} value={currDoDiff} onChangeText={updateZoomIn} style={styles.input2} />}

                    <TouchableOpacity onPress={() => selectDoDiffDoOver('do diff')}>
                        <Text style={[{ opacity: currDoDiffDoOver === 'do diff' ? 1 : 0.5 }, styles.text]}> do different </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={submitZoomIn}>
                        <Image style={[{ marginLeft: 20 }, styles.icon]} source={GreenForwardArrowIcon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}> {currDoDiff || day?.greatfull?.zoom_in} </Text>
            </View>

            <View style={styles.cont}>
                <View style={styles.inputOutputContRow}>
                    {selectedDoDiffDoOver !== '' && <TextInput maxLength={50} value={currDoOver} onChangeText={updateZoomOut} style={styles.input2} />}

                    <TouchableOpacity onPress={() => selectDoDiffDoOver('do over')}>
                        <Text style={[{ opacity: currDoDiffDoOver === 'do over' ? 1 : 0.5 }, styles.text]}> do over </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={submitZoomOut}>
                        <Image style={[{ marginLeft: 20 }, styles.icon]} source={GreenForwardArrowIcon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}> {currDoOver || day?.greatfull?.zoom_out} </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: screenHeight / 25,
    },
    inputOutputCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        borderBottomColor: grayphite,
        borderBottomWidth: 1,
        borderStyle: 'dotted',
        margin: 0,
        padding: 2.5,
        width: screenWidth,
    },
    inputOutputContRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        borderBottomColor: grayphite,
        borderBottomWidth: 1,
        borderStyle: 'dotted',
        margin: 0,
        padding: 2.5,
        height: screenHeight / 20,
        width: screenWidth,
    },
    text: {
        fontFamily: 'Fuzzy Bubbles',
        textAlign: 'center',
        fontSize: 16,
        // lineHeight: 1,
    },
    textLeft: {
        fontFamily: 'Fuzzy Bubbles',
        textAlign: 'left',
        fontSize: 16,
    },
    input2: {
        width: 24, // give it realistic room for text
        maxHeight: 20, // ✅ fixes the tall-on-type issue
        // maxHeight: 30, // ✅ fixes the tall-on-type issue
        paddingVertical: 0, // remove RN’s default 5-6 px padding
        paddingHorizontal: 8,
        borderRadius: 50,
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444',
        fontFamily: 'fuzzy',
        fontSize: 10,
        borderWidth: 1.5,
        borderColor: '#44454fea',
        textAlignVertical: 'center', // ✅ keeps text centered on Android
    },
    input: {
        width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
        margin: 0,
        alignSelf: 'center',
        borderRadius: 50, // makes it circular
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444', // equivalent of $grayphite
        fontFamily: 'fuzzy', // make sure the font is linked properly
        fontSize: 10, // or adjust based on design
        borderWidth: 1.5,
        borderColor: '#44454fea', // border color
    },
    button: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: grayphite,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 8,
        //    borderTopLeftRadius: 0,
        borderTopRightRadius: 3,
    },
    icon: {
        height: 20,
        width: 20,
    },
});

export default Greatfull;
