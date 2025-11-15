const EditDataRow = () => {};

// // top level imports
// import { useState, useEffect } from "react"
// import axios from 'axios'

// // @reduxjs/toolkit:
// import { RootState } from "redux/store/rootReducer"
// import { useSelector, useDispatch } from "react-redux"

// // components and styleing:
// import { Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
// import DataRowFollowUsers from "./DataRowFollowUsers";
// import DataRowVibe from "./DataRowVibe";
// import DataRowPeaceChill from "./DataRowPeaceChill";

// // utils:
// import { grayphite } from "@/constants/Colors"
// import { DiscoBallGoldIcon, PeaceIcon, ArtSplashIcon } from '@/constants/Images'
// import { useContentFunction } from "Contexts/ContentFunctions"
// import AllOursRequestDATA from "utility/allOursRequestDATA"
// import { profileAllUserEventsGETQueryStringFunc } from "graphql/queries"
// // import getBLOBfromS3 from "utility/AWS/getBLOBfromS3"
// import getBLOBandKEYandURLfromS3 from "@/utility/AWS/old/getBLOBandKEYandURLfromS3";
// import getObjBlobFromS3 from "@/utility/AWS/new/getObjBlobFromS3";
// import EventPreview from "../../Content/EventsList/EventPreview";

// const EditDataRow({

// }) {

//     useEffect(() => {
//         if (EDIT_CURR_PROFILE?.id) {
//             return;
//         }
//         const clone = { ...CURR_PROFILE }
//         dispatch(SET_EDIT_CURR_PROFILE(clone))

//     }, [])

//     const { peace, artsplash, discoBallGold } = useImage();

//     const changeDataRowClicked = (clickKey: string) => {
//         if (EDIT_DATA_ROW_CLICKED === clickKey) {
//             dispatch(SET_EDIT_DATA_ROW_CLICKED(''))
//         } else {
//             dispatch(SET_EDIT_DATA_ROW_CLICKED(clickKey))
//         }
//     }
//     const vibeClick = () => {
//         if (EDIT_DATA_ROW_CLICKED === 'vibe') {
//             dispatch(SET_EDIT_DATA_ROW_CLICKED(''))
//         } else {
//             dispatch(SET_EDIT_DATA_ROW_CLICKED('vibe'))
//         }
//     }

//     const profileEventsClickFunc = () => {

//     }

//     const downArrowClick = () => {

//     }

//     const peaceChillClick = () => {

//     }

//     const test = () => {
//         // console.log('EDIT_CURR_PROFILE', EDIT_CURR_PROFILE)
//     }

//     return (

//         <View style={styles.dataRow}>
//             <View style={styles.dataRowTopToolBar}>

//                 <TouchableOpacity onPress={() => changeDataRowClicked('vibe')}>
//                 <Image style={styles.dataRowTopToolBarIcons} source={ArtSplashIcon} />
//                 </TouchableOpacity>

//                 {
//                         <img
//                             style={{
//                                 opacity: EDIT_CURR_PROFILE?.show_chill_ppl_me ? "1.0" : "0.5"
//                             }}
//                             onClick={() => changeDataRowClicked('peacechill')} style={styles.dataRowTopToolBarIcons} source={PeaceIcon} />
//                 }

//                 <p onClick={() => changeDataRowClicked('downArrow')} style={{ color: "#D86220" }} style={styles.headerText}> &darr; </p>

//             </View>

//             <EditDataRowBottom />
//         </View>

//     )
// }

// function EditDataRowBottom() {

//     const EDIT_DATA_ROW_CLICKED = useSelector((state: RootState) => state.profile.EDIT_DATA_ROW_CLICKED)

//     return (

//         EDIT_DATA_ROW_CLICKED === "vibe"
//             ?
//             <EditDataRowVibe />
//             :
//             EDIT_DATA_ROW_CLICKED === "peacechill"
//                 ?
//                 <EditDataRowPeaceChill />
//                 :

//             EDIT_DATA_ROW_CLICKED === "downArrow"
//                 ?
//                 <EditDataRowFollowUsers />
//                 :
//             <></>

//     )
// }

// const styles = StyleSheet.create({
//     dataRow: {
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: "center",
//         width: '100%',
//         gap: 10
//     },
//     dataRowTopToolBar: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: "center",
//         gap: 10
//     },
//     dataRowTopToolBarIcons: {
//         height: 50,
//         width: 50,
//         borderRadius: 50
//     },
//     headerText: {
//         fontWeight: 400,
//         fontFamily: 'Fuzzy Bubbles',
//         color: grayphite,
//     }
// })

// export default EditDataRow;
