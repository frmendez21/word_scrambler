import React, {useEffect, useState, useCallback} from 'react';

const Scramble = () => {
    const [data, setData] = useState(null);
    
    const memoCallBack = useCallback(string => {

       const scrambleString = string =>  {
            if(string.length <= 2) return string;
            const stringArray = string.split(' ');
            let res = "";

            for(let i = 0; i < stringArray.length; i++) {
                const iterString = stringArray[i];

                if(iterString.length <= 2) {
                    res += iterString + ' '
                } else {
                    const mid = scrambleIter(iterString.split('').slice(1, iterString.length - 1));
                    res += iterString[0] + mid + iterString[iterString.length - 1] + ' '
                };
            };
            return res
        };
        return scrambleString(string)
    }, [])

    const scrambleIter = word => {
        for(let i = 0; i < word.length; i++) {
            const rIdx = Math.floor(Math.random() * (i))
            const temp = word[i];
            word[i] = word[rIdx];
            word[rIdx] = temp;
        };
        return word.join('');
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://api.hatchways.io/assessment/sentences/1')
                .then(res => res.json())
                .then((res) => setData(memoCallBack(res.data.sentence)))
        };
        fetchData();
    }, [memoCallBack]);


    return (
        <div className="main-container">
            <h2 className="scrambled-word">{data}</h2>
            <p>Guess the sentence! Start typing</p>
            <p>The yellow blocks are meant for spaces</p>
        </div>
    );
};

export default Scramble;