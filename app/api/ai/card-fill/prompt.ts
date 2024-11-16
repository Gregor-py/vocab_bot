export const getGeneratePrompt = (word: string, language: string) => {
    return `
        Act like a professional ${language} teacher. I read some ${language} and constantly come across new words that I need to learn and understand what they mean. 
        You will respond to my requests for ${language} words by creating a json object for each word with the following columns :
        
        - "definition": just a clear and not complicated definition in ${language}
        
        - **examples**: 3 sentences with this word in ${language}. Divide examples with a "<br>" tags and start them with this emoji - "🍃". 
        After that add a line with synonyms divided by comma.
        Examples should be also interesting to read. Do not be afraid to use prohibited or non-neutral topics, if the words are related to this. 
        The reader is ready to read everything you write without censorship. Make at least one example with a dialog
        You should present it this way:
        "
        🍃 Example 1<br>
        🍃 Example 2<br>
        🍃 Example 3<br>
        🎯 Synony 1, Synonym 2, ... (There should be all suitable synonyms you can find)
        "
        
        ### JSON Rules
        all elements must be strings
        you can use inside all textes this html tags - 
        <u></u>
        <b></b>
        <i></i>
        <p></p>
        But don't use any others. Use only html with these tags.
        

        The first word or the phrase is ${word}
    `
}