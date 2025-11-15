import axios from 'axios'
import React, { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer"
import { useSelector, useDispatch, createDispatchHook } from "react-redux"

import { Dimensions, TouchableOpacity, Image, TextInput, ScrollView, View, Text, StyleSheet } from 'react-native';
import { appBackground } from "@/constants/Colors";
import Day from '@/components/Content/Day/Day';
import NotificationList from '@/components/Content/UploadDay/Content/NotificationList';
import Navbar from '@/components/Navbar';

import EditDay from '@/components/Content/EditDay/EditDay';

// utils:
import { grayphite } from '@/constants/Colors';
import { BranchIcon, GreenForwardArrowIcon, DiceIcon, StarIcon, LitFireIcon, RedBackArrowIcon, TimeIcon } from '@/constants/Images';
import { allDaysGETquery } from "@/graphql/queries";
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { NoUndefinedVariablesRule } from 'graphql';

interface SetFeedToolProps {
    feed: any,
    setFeed: any,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SetFeedTool: React.FC<SetFeedToolProps> = ({
    feed,
    setFeed
}) => {

    const { blobbifyAndReturnPosts, daysGETweekOfFunction, daysGETdayOfFunction, daysGETmonthOfFunction } = useContentFunction();

    const [displayMenu, setDisplayMenu] = useState<any>('');
    const [inputSelection, setInputSelection] = useState<any>('');

    const [month, setMonth] = useState('mm');
    const [year, setYear] = useState('yyyy');

    const [weekOfMonth, setWeekOfMonth] = useState<any>('mm');
    const [weekOfYear, setWeekOfYear] = useState<any>('yyyy');
    const [weekOfDay, setWeekOfDay] = useState<any>('dd')

    const [dayOfMonth, setDayOfMonth] = useState<any>('mm');
    const [dayOfDay, setDayOfDay] = useState<any>('dd');
    const [dayOfYear, setDayOfYear] = useState<any>('yyyy');

    const [nothingFilledOutError, setNothingFilledOutError] = useState<boolean>(false)

    const clickRow = (type: string) => {
        if (type === "engagement") {
            setDisplayMenu('engagement');
        }
        if (type === "time") {
            setDisplayMenu('time');
        }
        if (type === "random") {
            setDisplayMenu(type);
        }
        if (type === "categories") {
            // probably just a dropdown it would add to the filter not change which function would be run            
        }
        if (type === "goBack") {
            setDisplayMenu('');
        }
    }

    const changeMonthYearInputsForDiscoverTool = (event: React.ChangeEvent<HTMLInputElement>, inputType: any, dayMonthOrYear: string, setDayFunc: any, setMonthFunc: any, setYearFunc: any) => {
        if (inputType === "monthOf") {
            console.log('monthOf')
            setWeekOfDay('dd');
            setWeekOfMonth('mm')
            setWeekOfYear('yyyy')

            setDayOfDay('dd');
            setDayOfMonth('mm');
            setDayOfYear('yyyy');
        }

        if (inputType === "weekOf") {
            console.log('weekOf')
            setMonth('mm');
            setYear('yyyy');

            setDayOfDay('dd');
            setDayOfMonth('mm');
            setDayOfYear('yyyy');
        }
        if (inputType === "dayOf") {
            setMonth('mm');
            setYear('yyyy');

            setWeekOfDay('dd');
            setWeekOfMonth('mm')
            setWeekOfYear('yyyy')
        }


        let value: string = event?.target?.value;
        // Keep only numbers

        let numVal = value.replace(/[^0-9]/g, '');

        console.log('value', value);
        console.log('numVal', numVal);

        if (dayMonthOrYear === "day") {
            if (parseInt(numVal, 10) > 30) {
                numVal = '30'
            }
            setDayFunc(numVal)
        }

        if (dayMonthOrYear === "month") {
            if (numVal.length === 1) {
                // Restrict first digit to 0 or 1
                if (parseInt(numVal, 10) > 1) {
                    numVal = "1";
                }
            } else if (numVal.length === 2) {
                // Restrict second digit to stay within 12
                const firstDigit = parseInt(numVal[0], 10);
                if (firstDigit === 1 && parseInt(numVal, 10) > 12) {
                    numVal = "12";
                } else if (firstDigit === 0 && parseInt(numVal[1], 10) > 9) {
                    numVal = "09"; // Ensure valid single-digit months
                }
                if (numVal === "02" || numVal === "2") {
                    // non props just change both day state to match february 
                    if (weekOfDay > '28') setWeekOfDay('28')
                }
            }
            setMonthFunc(numVal);
        } else if (dayMonthOrYear === "year") {
            if (numVal?.length === 4 && (parseInt(numVal) < 2024 || parseInt(numVal) > 2025)) {
                numVal = '2024';
            }
            setYearFunc(numVal); // No restrictions for year beyond parsing numbers
        }
    };

    // const retrievePostsWithDates = async () => {
    //     if (month?.length && year?.length && month !== 'mm' && year !== "yyyy") {
    //         console.log("month & year (basic bitch)");
    //         const posts = await daysGETmonthOfFunction(month, year);
    //         const blobbedPosts = await blobbifyAndReturnPosts(posts);
    //         console.log('posts', posts)
    //         console.log('feed', feed)
    //         setPostsAsTodayFeed(blobbedPosts, feed, setFeed)
    //         // setFeed(feedClone);                        
    //     } else if (weekOfMonth?.length && weekOfYear?.length && weekOfMonth !== "mm" && weekOfYear !== "yyyy") {
    //         const posts = await daysGETweekOfFunction(weekOfDay, weekOfMonth, weekOfYear);
    //         const blobbedPosts = await blobbifyAndReturnPosts(posts);
    //         console.log('posts', posts)
    //         console.log('feed', feed)
    //         setPostsAsTodayFeed(blobbedPosts, feed, setFeed)
    //         console.log('week of function');
    //     } else if (dayOfMonth?.length && dayOfYear?.length && dayOfMonth !== "mm" && dayOfYear !== "yyyy") {
    //         const posts = await daysGETdayOfFunction(weekOfDay, weekOfMonth, weekOfYear);
    //         const blobbedPosts = await blobbifyAndReturnPosts(posts);
    //         console.log('posts', posts)
    //         console.log('feed', feed)
    //         setPostsAsTodayFeed(blobbedPosts, feed, setFeed)
    //         console.log('week of function');
    //         console.log('func for day of');
    //     } else {
    //         setNothingFilledOutError(true);
    //         setTimeout(() => {
    //             setNothingFilledOutError(false);
    //         }, 10000)
    //     }
    // }

    return (
        <View style={styles.outerCont}>
            {
                displayMenu === 'random'
                    ?
                    <RandomPicker
                        clickRow={clickRow}
                        displayMenu={displayMenu}
                        greenForwardArrow={GreenForwardArrowIcon}
                        nothingFilledOutError={nothingFilledOutError}
                        feed={feed}
                        setFeed={setFeed}
                    />
                    :
                    (displayMenu === 'time' || displayMenu === 'trending')
                        ?
                        <DatePicker
                            displayMenu={displayMenu}
                            nothingFilledOutError={nothingFilledOutError}
                            setNothingFilledOutError={setNothingFilledOutError}
                            clickRow={clickRow}
                            feed={feed}
                            setFeed={setFeed}
                        />
                        :
                        <Rows clickRow={clickRow} />
            }
        </View>
    )
}

interface RandomPickerProps {
    clickRow: any,
    displayMenu: any,
    greenForwardArrow: any,
    nothingFilledOutError: any,
    feed: any,
    setFeed: any,
}

const RandomPicker: React.FC<RandomPickerProps> = ({
    clickRow,
    displayMenu,
    greenForwardArrow,
    nothingFilledOutError,
    feed,
    setFeed
}) => {

    const retrievePostsRandomly = () => {
        console.log('feed', feed)
    }

    // const { branch, redBackArrow, dice } = useImage();

    return (
        <>
            <View style={styles.branchCont}>
                <Image style={styles.branchIcon} source={BranchIcon} />
            </View>

            <View style={styles.discoverRowMini}>

                <TouchableOpacity onPress={() => clickRow('goBack')}>
                    <Image style={styles.iconMini} source={RedBackArrowIcon} />
                </TouchableOpacity>

                <Image style={styles.iconMini} source={DiceIcon} />

                <TouchableOpacity onPress={retrievePostsRandomly}>
                    <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.branchCont}>
                <Image style={styles.branchIcon} source={BranchIcon} />
            </View>
        </>
    )
}

interface props {
    displayMenu: any,
    nothingFilledOutError: any,
    setNothingFilledOutError: any,
    clickRow: any,
    feed: any,
    setFeed: any,
}

const DatePicker: React.FC<props> = ({
    displayMenu,
    nothingFilledOutError,
    setNothingFilledOutError,
    clickRow,
    feed,
    setFeed
}) => {

    const [month, setMonth] = useState('mm');
    const [year, setYear] = useState('yyyy');

    const [weekOfMonth, setWeekOfMonth] = useState<any>('mm');
    const [weekOfYear, setWeekOfYear] = useState<any>('yyyy');
    const [weekOfDay, setWeekOfDay] = useState<any>('dd')

    const [dayOfMonth, setDayOfMonth] = useState<any>('mm');
    const [dayOfDay, setDayOfDay] = useState<any>('dd');
    const [dayOfYear, setDayOfYear] = useState<any>('yyyy');

    // const { blobbifyAndReturnPosts } = useContentFunction();
    const { blobbifyAndReturnPosts, daysGETtrendingwithMonthAndYearFunction, daysGETweekOfFunction, daysGETtrendingWeekOfFunction, daysGETdayOfFunction, daysGETtrendingDayOfFunction, daysGETmonthOfFunction, setPostsAsTodayFeed } = useContentFunction();


    // const { star, iconLitFire, eyes, iconSortByTime, redBackArrow, greenForwardArrow, branch } = useImage();

    const changeMonthYearInputsForDiscoverTool = (event: React.ChangeEvent<HTMLInputElement>, inputType: any, dayMonthOrYear: string, setDayFunc: any, setMonthFunc: any, setYearFunc: any) => {
        if (inputType === "monthOf") {
            console.log('monthOf')
            setWeekOfDay('dd');
            setWeekOfMonth('mm')
            setWeekOfYear('yyyy')

            setDayOfDay('dd');
            setDayOfMonth('mm');
            setDayOfYear('yyyy');
        }

        if (inputType === "weekOf") {
            console.log('weekOf')
            setMonth('mm');
            setYear('yyyy');

            setDayOfDay('dd');
            setDayOfMonth('mm');
            setDayOfYear('yyyy');
        }
        if (inputType === "dayOf") {
            setMonth('mm');
            setYear('yyyy');

            setWeekOfDay('dd');
            setWeekOfMonth('mm')
            setWeekOfYear('yyyy')
        }


        let value: string = event?.target?.value;
        // Keep only numbers

        let numVal = value.replace(/[^0-9]/g, '');

        console.log('value', value);
        console.log('numVal', numVal);

        if (dayMonthOrYear === "day") {
            if (parseInt(numVal, 10) > 30) {
                numVal = '30'
            }
            setDayFunc(numVal)
        }

        if (dayMonthOrYear === "month") {
            if (numVal.length === 1) {
                // Restrict first digit to 0 or 1
                if (parseInt(numVal, 10) > 1) {
                    numVal = "1";
                }
            } else if (numVal.length === 2) {
                // Restrict second digit to stay within 12
                const firstDigit = parseInt(numVal[0], 10);
                if (firstDigit === 1 && parseInt(numVal, 10) > 12) {
                    numVal = "12";
                } else if (firstDigit === 0 && parseInt(numVal[1], 10) > 9) {
                    numVal = "09"; // Ensure valid single-digit months
                }
                if (numVal === "02" || numVal === "2") {
                    // non props just change both day state to match february 
                    if (weekOfDay > '28') setWeekOfDay('28')
                }
            }
            setMonthFunc(numVal);
        } else if (dayMonthOrYear === "year") {
            if (numVal?.length === 4 && (parseInt(numVal) < 2024 || parseInt(numVal) > 2025)) {
                numVal = '2024';
            }
            setYearFunc(numVal); // No restrictions for year beyond parsing numbers
        }
    };

    const retrievePostsWithDates = async () => {

        let posts;
        if (month?.length && year?.length && month !== 'mm' && year !== "yyyy") {
            console.log("month & year (basic bitch)");
            if (displayMenu === "time") {
                posts = await daysGETmonthOfFunction(month, year);
                console.log('posts', posts)
            }
            if (displayMenu === "trending") {
                posts = await daysGETtrendingwithMonthAndYearFunction(month, year);
                console.log('posts', posts)
            }
            const blobbedPosts = await blobbifyAndReturnPosts(posts);
            console.log('feed', feed)
            setPostsAsTodayFeed(blobbedPosts, feed, setFeed)
            // setFeed(feedClone);                        
        } else if (weekOfMonth?.length && weekOfYear?.length && weekOfMonth !== "mm" && weekOfYear !== "yyyy") {
            if (displayMenu === "time") {
                posts = await daysGETweekOfFunction(weekOfDay, weekOfMonth, weekOfYear);
            }
            if (displayMenu === "trending") {
                posts = await daysGETtrendingWeekOfFunction(weekOfDay, weekOfMonth, weekOfYear);
            }
            const blobbedPosts = await blobbifyAndReturnPosts(posts);
            console.log('posts', posts)
            console.log('feed', feed)
            setPostsAsTodayFeed(blobbedPosts, feed, setFeed)
            console.log('week of function');
        } else if (dayOfMonth?.length && dayOfYear?.length && dayOfMonth !== "mm" && dayOfYear !== "yyyy") {
            if (displayMenu === "time") {
                posts = await daysGETdayOfFunction(weekOfDay, weekOfMonth, weekOfYear);
            }
            if (displayMenu === "trending") {
                posts = await daysGETtrendingDayOfFunction(weekOfDay, weekOfMonth, weekOfYear);
            }
            const blobbedPosts = await blobbifyAndReturnPosts(posts);
            console.log('posts', posts)
            console.log('feed', feed)
            setPostsAsTodayFeed(blobbedPosts, feed, setFeed)
            console.log('week of function');
            console.log('func for day of');
        } else {
            setNothingFilledOutError(true);
            setTimeout(() => {
                setNothingFilledOutError(false);
            }, 10000)
        }
    }

    return (
        <View style={styles.outerCont}>
            <View style={styles.branchCont}>
                <Image style={styles.branchIcon} source={BranchIcon} />
            </View>

            <View style={styles.discoverRowMini}>

                <TouchableOpacity onPress={() => clickRow('goBack')}>
                    <Image style={styles.iconMini} source={RedBackArrowIcon} />
                </TouchableOpacity>

                <Image style={styles.iconMini} source={displayMenu === "time" ? TimeIcon : LitFireIcon} />

                <TouchableOpacity onPress={retrievePostsWithDates}>
                    <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
                </TouchableOpacity>

            </View>

            <View style={styles.discoverRows}>
                <TextInput maxLength={2} onChange={(event: any) => changeMonthYearInputsForDiscoverTool(event, "monthOf", 'month', null, setMonth, setYear)} value={month} style={[{ width: 20 }, styles.input]} />
                <TextInput maxLength={4} onChange={(event: any) => changeMonthYearInputsForDiscoverTool(event, "monthOf", 'year', null, setMonth, setYear)} value={year} style={[{ width: 20 }, styles.input]} />
            </View>

            <View style={styles.discoverRows}>
                <Text style={styles.text}> week of </Text>
                <TextInput maxLength={2} onChange={(event: any) => changeMonthYearInputsForDiscoverTool(event, 'weekOf', 'month', null, setWeekOfMonth, setWeekOfYear)} value={weekOfMonth} style={[{ width: 20 }, styles.input]} />
                <TextInput maxLength={2} onChange={(event: any) => changeMonthYearInputsForDiscoverTool(event, 'weekOf', 'day', setWeekOfDay, setWeekOfMonth, setWeekOfYear)} value={weekOfDay} style={[{ width: 20 }, styles.input]} />
                <TextInput maxLength={4} onChange={(event: any) => changeMonthYearInputsForDiscoverTool(event, 'weekOf', 'year', null, setWeekOfMonth, setWeekOfYear)} value={weekOfYear} style={[{ width: 40 }, styles.input]} />
            </View>

            <View style={styles.discoverRows}>
                <Text style={styles.text}> day of </Text>
                <TextInput maxLength={2} onChange={(event: any) => changeMonthYearInputsForDiscoverTool(event, 'dayOf', 'month', null, setDayOfMonth, setDayOfYear)} value={dayOfMonth} style={[{ width: 20 }, styles.input]} />
                <TextInput maxLength={2} onChange={(event: any) => changeMonthYearInputsForDiscoverTool(event, 'dayOf', 'day', setDayOfDay, setDayOfMonth, setDayOfYear)} value={dayOfDay} style={[{ width: 20 }, styles.input]} />
                <TextInput maxLength={4} onChange={(event: any) => changeMonthYearInputsForDiscoverTool(event, 'dayOf', 'year', null, setDayOfMonth, setDayOfYear)} value={dayOfYear} style={[{ width: 40 }, styles.input]} />
            </View>

            <View style={styles.branchCont}>
                <Image style={styles.branchIcon} source={BranchIcon} />
            </View>
        </View>
    )
}

interface RowsProps {
    clickRow: any,
}

const Rows: React.FC<RowsProps> = ({
    clickRow
}) => {

    // const { star, iconLitFire, iconSortByTime, branch, dice } = useImage();


    return (
        <View style={styles.outerCont}>

            <View style={styles.branchCont}>
                <Image style={styles.branchIcon} source={BranchIcon} />
            </View>

            <TouchableOpacity onPress={() => clickRow('engagement')}>

                <View style={styles.discoverRows}>
                    <Image style={styles.iconMini} source={StarIcon} />
                    <Image style={styles.iconMini} source={LitFireIcon} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => clickRow('time')}>
                <View style={styles.discoverRows}>
                    <Image style={styles.iconMini} source={TimeIcon} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => clickRow('random')}>

                <View style={styles.discoverRows}>
                    <Text style={styles.text}> random </Text>
                    <Image style={styles.iconMini} source={DiceIcon} />
                </View>

            </TouchableOpacity>

            <View style={styles.branchCont}>
                <Image style={styles.branchIcon} source={BranchIcon} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    outerCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: screenWidth / 2,
        borderWidth: 2,
        borderColor: grayphite,
        // padding: 5,
        margin: 0,
        // boxSizing: 'border-box',
    },
    branchIcon: {
        height: 40,
        width: screenWidth / 4
    },
    branchCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconMini: {
        height: 35,
        width: 35,
    },
    discoverRowMini: {
        width: '100%',
        margin: 0,
        paddingVertical: 2.5,
        paddingHorizontal: 2.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: grayphite,        
    },

    discoverRows: {
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: grayphite,
        borderStyle: 'dotted',
        width: screenWidth / 2,
        padding: 5,
        // boxSizing: 'border-box',
        // width: '100%',
        gap: 10,
    },

    text: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 14,
    },

    input: {
        margin: 0,
        // textAlign: 'center',
        // fontWeight: 400,
        // color: grayphite,
        // fontFamily: 'Fuzzy Bubbles',        
        // width: 20,
    },

})

export default SetFeedTool;