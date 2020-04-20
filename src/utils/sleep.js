export default function(s) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve();
        })
    },s * 1000)
}