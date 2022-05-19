import logo from './logo.svg';
import './App.css';
import {Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";


function App() {
    const [data, setData] = useState([]);
    const [date, setDate] = useState('')
    const [data2, setData2] = useState([
        {id:1, name: 'Xbox One'},
        {id:186, name: 'Xbox Series S/X'},
        {id:4, name: 'PC'},
        {id: 7, name: 'Nintendo Switch'},
        {id:18, name: 'Playstation 4'},
        {id:187, name: 'Playstation 5'},
    ])
    const [chosenPlatforms, setChosenPlatforms] = useState([])
    const [newPlatforms,setNewPlatforms] = useState([])

    const removePlatform = (x) => {
        setChosenPlatforms(chosenPlatforms.filter(item => item.id !== x))
    }

    const handleClick = (id) => {
        let x = id
        if (chosenPlatforms.some(item => item.id === x)) {
            // console.log('already chosen')
            removePlatform(x)
            newPlatforms.pop()
            // console.log(newPlatforms)
            document.getElementById(id).style.backgroundColor = 'white';
        } else {
            document.getElementById(id).style.backgroundColor = 'green';
            setChosenPlatforms(chosenGenres => [...chosenGenres, {id: id}])
            newPlatforms.push(x)
            // console.log(chosenPlatforms)
            // console.log(newPlatforms)
        }


        // console.log(chosenGenres)
    }


    useEffect(() => {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let date2 = today.getFullYear() + 1
        setDate(date + ',' + date2);
    }, []);


    ///e90c89666847411cad7ebeb236040bd6

    useEffect(() => {
        if (newPlatforms.length <= 0){
            fetch('https://api.rawg.io/api/games?dates=2022-05-18,2022-06-01&platforms=4&page_size=100&key=e90c89666847411cad7ebeb236040bd6')
                .then((res) => res.json())
                .then((data) => setData(data.results))
                .then(() => console.log(data))
                .then(() => console.log('useffectrun length smaller than zero'))
        } else {
            let z = newPlatforms.join()
            fetch('https://api.rawg.io/api/games?dates=2022-05-18,2022-06-01&platforms='+ z +'&page_size=100&key=e90c89666847411cad7ebeb236040bd6')
                .then((res) => res.json())
                .then((data) => setData(data.results))
                .then(() => console.log(data))
                .then(() => console.log('useffectrun'))
                .then(() => console.log(newPlatforms.join()))
        }
    }, [chosenPlatforms]);

    // useEffect(() => {
    //     fetch('https://api.rawg.io/api/platforms?&key=e90c89666847411cad7ebeb236040bd6',)
    //         .then((res) => res.json())
    //         .then((data) => setData2(data.genres));
    // }, []);
    //
    // onClick={() => handleClick(id, name)}

    return (

        <div>

            <Container>
                <Typography
                    color="textPrimary"
                    variant="h3"
                    align="center"
                    paragraph
                > Upcoming games{" "} </Typography>
                <Typography color="textPrimary"
                            variant="h4"
                            align="center"
                            paragraph>Track games!</Typography>

                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid  container justifyContent="center" spacing={2} >
                        {data2.map(({name, id}) => (
                            <Chip variant="outlined" clickable={true} label={name} id={id}
                                  onClick={() => handleClick(id)}
                            />))}
                    </Grid>
                </Grid>
                </Grid>

                        <Grid container spacing={2}>
                            {data.map((games, index) => (
                                <Grid item xs={12} sm={3} key={index}>
                                    <Card
                                        sx={{
                                            display: 'block',
                                            width: '345',
                                            boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                                            backgroundColor: "#fafafa",
                                            height: 1,
                                            transition: "transform 0.15s ease-in-out",
                                            "&:hover": {transform: "scale3d(1.02, 1.02, 1)"},
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                    <CardActionArea>
                                        <CardMedia sx={{width: 'auto', height: 128}} image={games.background_image}/>
                                    </CardActionArea>
                                    <CardContent>
                                        {games.name}
                                    </CardContent>
                                    </Card>
                                </Grid>
                            ))}

                        </Grid>

            </Container>
        </div>

    );
}

export default App;
