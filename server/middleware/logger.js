
const logger = (req,res,next) => {

    if (req.method !== 'OPTIONS') {
        console.log(" ");
        res.on('finish', () => {
            const log = `${req.method} ${req.originalUrl} ${res.statusCode}`;
            console.log(log);
        });
    }
    next(); 
}

export default logger;