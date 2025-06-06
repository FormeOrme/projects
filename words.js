class Words {
    static sets = {
        adj: "amiable,adaptable,ambitious,artistic,athletic,authentic,amazing,able,active,affluent,brave,bright,brilliant,bold,bighearted,balanced,benevolent,blissful,buoyant,bouncy,cheerful,calm,charming,courageous,creative,caring,compassionate,clever,candid,curious,daring,delightful,decisive,disciplined,diligent,dynamic,driven,devoted,determined,daring,energetic,empathetic,elegant,earnest,eloquent,efficient,enthusiastic,ethical,expert,educated,funny,friendly,fantastic,fearless,focused,fair,flexible,faithful,forgiving,frugal,generous,gentle,genuine,grateful,gifted,grounded,graceful,goaloriented,gracious,gallant,happy,hopeful,humble,helpful,honest,humorous,hardworking,hospitable,healthy,honorable,imaginative,innovative,intuitive,intelligent,inspiring,influential,independent,insightful,inclusive,inquisitive,joyful,jovial,judicious,jubilant,just,jolly,joyful,jazzy,judicious,jaunty,kind,keen,knowledgeable,knowing,kingly,kindhearted,kinetic,knightly,keeneyed,klutzy,loyal,logical,loving,lively,lucky,levelheaded,likable,learned,luminous,largehearted,mature,mindful,motivated,meticulous,modest,mighty,magnetic,methodical,meaningful,mindful,noble,nurturing,nice,nimble,nurturing,neat,nonjudgmental,noteworthy,neighborly,natural,optimistic,organized,outgoing,openminded,observant,original,outstanding,obedient,objective,openhearted,patient,passionate,perceptive,persistent,peaceful,polite,powerful,proactive,practical,positive,quickwitted,quiet,quirky,qualified,quaint,quintessential,questioning,quirky,queenly,quizzical,reliable,respectful,resilient,resourceful,rational,radiant,relaxed,reflective,resolute,rare,sincere,sympathetic,sensitive,smart,strong,supportive,spontaneous,savvy,selfless,spirited,thoughtful,thankful,talented,truthful,tenacious,trustworthy,tactful,tolerant,thorough,tranquil,unique,understanding,upbeat,unselfish,uplifting,unwavering,urbane,upbeat,unified,unassuming,versatile,vigilant,vibrant,valiant,virtuous,valuable,visionary,vocal,vivacious,vigorous,wise,warmhearted,witty,willing,wellrounded,winsome,watchful,welcoming,wonderful,worthy,youthful,yielding,yellowbellied,yearning,yappy,youngminded,zealous,zesty,zany,zen,zippy".split(","),
        noun: "apple,anchor,airplane,alarm,arrow,asteroid,album,ant,atlas,apron,book,bottle,box,brush,bulb,blanket,biscuit,balloon,bell,broom,chair,clock,candle,camera,car,card,coin,cage,curtain,cupcake,desk,diamond,drum,door,dice,dart,dog,donut,dagger,document,envelope,egg,engine,eraser,elevator,earring,easel,earth,equipment,envelope,fork,fan,flower,feather,flag,flute,flashlight,frame,fire,fruit,guitar,globe,glove,glass,gate,gift,grass,glue,goggles,gadget,hammer,hat,helmet,hanger,honey,house,hook,horn,heater,harp,ice,igloo,ink,instrument,iron,island,icicle,invitation,image,implement,jacket,jar,jewel,joystick,jigsaw,journal,jug,javelin,joystick,juice,key,kite,kettle,knife,knob,kayak,keyboard,kimono,keepsake,knapsack,lamp,ladder,leaf,locket,lens,leash,lantern,label,loaf,lanyard,mug,map,magnet,mask,mirror,marker,medal,mitt,menu,mop,notebook,necklace,needle,net,newspaper,napkin,nut,novel,nail,nest,oven,orb,orange,ornament,oil,oar,ottoman,organ,obelisk,outlet,pen,pillow,plate,plant,paper,pan,pencil,phone,pillowcase,passport,quilt,quarter,quill,queue,quiche,quartz,question,quiver,quintet,quilt,radio,rug,ruler,rope,ring,refrigerator,ribbon,rake,road,rose,spoon,suitcase,stamp,soap,sponge,sock,screen,sword,suitcase,shoe,table,towel,television,tool,toothbrush,ticket,toy,trash,tablet,tent,umbrella,uniform,urn,utensil,ukelele,unicorn,unit,utensil,urn,ultrasound,vase,vest,violin,vehicle,vent,video,vacuum,vine,volcano,visor,watch,window,wallet,whistle,wheel,water,wardrobe,wagon,wire,wallet,xylophone,yarn,yoke,yogurt,yacht,yardstick,yoyo,yurt,yolk,yam,zipper,ziggurat,zucchini,zeppelin,zone,zest,zodiac,zither,zigzag".split(",")
    }

    static get adjective() {
        return Words.sets.adj[Math.floor(Math.random() * Words.sets.adj.length)]
    }
    static get noun() {
        return Words.sets.noun[Math.floor(Math.random() * Words.sets.noun.length)]
    }

    static get title() {
        return `${Words.adjective}_${Words.noun}`
    }

    static random(n) {
        let words = []
        for (let i = 0; i < n; i++) {
            words.push(Words.adjective)
        }
        return words
    }
}