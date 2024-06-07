import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
var parseString = require('react-native-xml2js').parseString;

interface NewsItem {
    title: string;
    pubDate: string;
    description: string;
    link: string;
}

const NewsList: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchRSS = async () => {
            try {
                const response = await fetch('https://www.inegi.org.mx/rss/noticias/xmlfeeds?p=4,29');
                const text = await response.text();
                parseString(text, (err: Error, result: any) => {
                    if (err) {
                        console.error('Error parsing XML:', err);
                    } else {
                        const items = result.rss.channel[0].row.map((row: any) => ({
                            title: row.title[0],
                            pubDate: row.pubdate[0],
                            description: row.description[0],
                            link: row.link[0],
                        }));
                        setNews(items);
                    }
                });
            } catch (error) {
                console.error('Error fetching RSS feed:', error);
            }
        };

        fetchRSS();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {news.map((item, index) => (
                <View key={index} style={styles.newsItem}>
                    <View style= {styles.newsHeader}>
                        <Text style={styles.newsTitle}>{item.title}</Text>
                        <Text style={styles.newsDate}>{new Date(item.pubDate).toLocaleDateString()}</Text>
                    </View>
                    <Text style={styles.newsDescription}>{item.description}</Text>
                    <Text style={styles.newsLink}>{item.link}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    newsItem: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: "#a8ffbe"
    },
    newsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    newsDate: {
        fontSize: 12,
        color: '#888',
        margin: 20
    },
    newsDescription: {
        marginTop: 10,
        fontSize: 14,
    },
    newsLink: {
        marginTop: 10,
        fontSize: 14,
        color: 'blue',
    },
    newsHeader:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center',
        padding: 10
    },
    
});

export default NewsList;