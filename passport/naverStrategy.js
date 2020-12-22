const passport =require('passport');
const NaverStraterge=require('passport-naver').Strategy;

const User=require('../models/user');

module.exports=()=>{
    passport.use(new NaverStraterge({
        clientID:process.env.NAVER_ID,
        clientSecret:process.env.NAVER_SECRET_ID,
        callbackURL:'/auth/naver/callback',
    },async(accessToken,refreshToken,profile,done)=>{
        console.log('naver profile',profile);
        try{
            const exUser=await User.findOne({
                where:{snsId:profile.id,provider:'naver'},
            });
            if(exUser){
                done(null,exUser);
            }else{
                const newUser= await User.create({
                    email:profile._json&&profile._json.kaccount_email,
                    nick:profile.displayName,
                    snsId:profile.id,
                    provider:'naver',
                });
                done(null,newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};