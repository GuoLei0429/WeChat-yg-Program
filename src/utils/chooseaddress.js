export default function() {
    return new Promise ((resolve,reject) => {
        mpvue.chooseAddress({
            success (info) {
                resolve(info)
            }
        })
    })
}