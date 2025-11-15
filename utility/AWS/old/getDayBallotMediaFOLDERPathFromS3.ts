export default function getDayBallotMediaFOLDERPathFromS3(dayId:string|number, fileType:string) {
    if (!fileType) {
        return `media/day-${dayId}-folder/ballots`
    } else {
        return `media/day-${dayId}-folder/ballots/${fileType}`        
    }
}
