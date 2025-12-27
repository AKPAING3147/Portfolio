import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const lyrics = [
    "I'm not in the mood 'cause my flight delayed",
    "So I jumped on a private jet, and I'm askin' the pilot the ETA",
    "Lambo' parked on the landin' strip, everyone in my gang and my DJ paid",
    "Why's my man talkin' 'bout Inshallah? These times, he don't even pray",
    "Why's my man wearin' a Jesus piece? How does she squeeze in 'em jeans?",
    "Big behind and petitest waist, take time with the GBG, we don't beef nobody like GBK",
    "Woke up on the wrong side of bed, so he's gonna get - if I don't have my P's today",
    "I love my young boy, I won't lead him 'stray, I'm stuck to lil' bro like PVA",
    "Paid already, I don't need no hit song",
    "We don't need ID, lil' bro 17 in the club, he ain't scrollin' TikTok",
    "F's just saw him a thick one, 'Which one? Who do you want, bro? Pick one'",
    "If I shoot my shot, I'll hit one, matter of time 'til I get 'em all ticked off, alright",
    "We can go band for band, - that, we can go M for M",
    "Quarter mil' for the Maybach truck, double R with the factory rims",
    "I got the 90, the Urus, the Virgil, the Brabus, I'm really a threat",
    "It's got to the point that I don't even care, I got jewels in the safe that I don't even wear",
    "Uh, bro'll do it for some shoes and some clothes, you'll see what he'll do for a necklace",
    "'Rari truck, it look like a spider, it's crawlin' a dollar on just accessories (damn)",
    "She made me wanna go harder, I like her whole aura, I think I'm obsessed with her",
    "They hit h- birthday, did him the worst way, he had a death wish",
    "I get right under they skin, I don't even try, I guess I can't help that -",
    "I'ma have love for bro for life if we talk or not, I step with 'em",
    "Of course, you can beat me at talkin', ain't no back and forth, wait 'til we catch up with 'em -",
    "Knockin' a bag and makin' the opposite mad, I done fell in love wit' it",
    "UK Selfridges with a cute one (ooh), bank account look good, this a new one (yeah)",
    "You the type like to type on computers (wow), got a mask, but he ain't no - (haha)",
    "Top ten, but she don't act bougie, me and your friends can go to Aruba",
    "Hit France, it depend on my mood, this a Maybach Benz, this ain't no Uber",
    "We can go band for band, -, we can go M for M",
    "Mama got a body like Kim and 'em, mama been killin' that gym",
    "We can go watch for watch, from chain to chain, the rings, I'm him",
    "I done got rich, but I'm still with the -, land in London and go to the ends",
    "We can go band for band, - that, we can go M for M",
    "Quarter mil' for the Maybach truck, double R with the factory rims",
    "I got the 90, the Urus, the Virgil, the Brabus, I'm really a threat",
    "It's got to the point that I don't even care, I got jewels in the safe that I don't even wear"
];

export const FallingLyrics: React.FC = () => {
    const [items, setItems] = useState<Array<{ id: number; text: string; delay: number }>>([]);

    useEffect(() => {
        // Generate items with sequential delay for even spacing
        const newItems = lyrics.map((line, index) => ({
            id: index,
            text: line,
            // START DELAY: 13 seconds (Intro) + sequential spacing
            delay: 13 + (index * 1.5),
        }));
        setItems(newItems);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* INTRO TITLE ANIMATION (0s - 12s approx) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1.1, 1.5],
                    filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(20px)']
                }}
                transition={{
                    duration: 12, // Title visible for 12s
                    times: [0, 0.1, 0.8, 1],
                    ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center z-50 px-4"
            >
                <div>
                    <h1 className="text-4xl sm:text-6xl md:text-9xl font-retro font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 drop-shadow-[0_0_50px_rgba(234,88,12,0.8)] text-center tracking-tighter break-words">
                        BAND4BAND
                    </h1>
                    <p className="text-center text-orange-200 font-mono text-sm md:text-xl mt-4 tracking-widest uppercase opacity-80">Central Cee x Lil Baby</p>
                </div>
            </motion.div>

            {items.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ y: -100, opacity: 0, x: '-50%' }}
                    animate={{
                        y: '110vh',
                        opacity: [0, 1, 1, 1, 0] // Fade in -> Stay Visible -> Fade Out
                    }}
                    transition={{
                        duration: 28, // Slower speed (28s fall)
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: (lyrics.length * 1.5) - 28 // Maintain loop timing
                    }}
                    style={{
                        left: '50%',
                    }}
                    className="absolute top-0 text-orange-500 font-bold font-mono text-sm sm:text-base md:text-3xl whitespace-normal md:whitespace-nowrap drop-shadow-[0_0_15px_rgba(249,115,22,1)] text-center w-full px-4 max-w-4xl"
                >
                    {item.text}
                </motion.div>
            ))}
        </div>
    );
};
