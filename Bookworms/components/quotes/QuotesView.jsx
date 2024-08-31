import { TouchableOpacity, Image, ScrollView } from 'react-native'
import { NativeWindStyleSheet } from "nativewind"
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase.js'
import Quote from './Quote';
import icons from "../../constants/icons.js"

NativeWindStyleSheet.setOutput({
  default: "native",
});

const QuotesView = ({userID, handleClick}) => {
  const [quotes, setQuotes] = useState([])

  async function getQuotes(userID) {
    const { data: quotes, quoteError } = await supabase
      .from('quotes')
      .select('*')
      .eq('user_id', userID);

    if (quoteError) {
      Alert.alert(quoteError)
      return;
    }

    setQuotes(quotes || [])
  }

  useEffect(() => {
    getQuotes(userID);
  }, [userID]);

  return (
    // might need alternative to flexShrink
    <ScrollView contentContainerStyle={{ flexGrow: 1, flexShrink: 1}}>
        <TouchableOpacity 
        className="justify-center items-center bg-accentdark pt-5 mb-5"
        activeOpacity={0.4}
        onPress={handleClick}>
            <Image
                source={icons.plus}
                className="w-8 h-8"
                resizeMode="contain"
            />
        </TouchableOpacity>

        {quotes.map((quote, index) => (
        <Quote
          key={index}
          userID={userID}
          quote={quote.quote}
        />
      ))}

    </ScrollView>
  )
}

export default QuotesView