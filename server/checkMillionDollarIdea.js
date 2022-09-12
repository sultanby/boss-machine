const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    const value = Number(numWeeks) * Number(weeklyRevenue);
    if( value < 1000000 || isNaN(value) ){
        res.status(400).send('not valid')
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
