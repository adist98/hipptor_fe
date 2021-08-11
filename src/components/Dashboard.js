import React, {useState, useEffect} from 'react'
// import {Card, Button, Alert} from "react-bootstrap"
import {Link, useHistory} from "react-router-dom"
import { makeStyles, createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { positions } from '@material-ui/system';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import {useAuth} from '../contexts/AuthContext';
import axios from "axios";
import Modal from "react-modal";
import Logo from '../assets/logo2.png';
import Hippo from '../assets/logo3.png'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ComputerIcon from '@material-ui/icons/Computer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
export default function Dashboard() {

    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    console.log("Here I am",JSON.stringify(currentUser))
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();
    async function handleLogOut() {
        setError('');
        try {
            await logout()
            history.pushState('/')
        } catch {
            setError('Failed to Log Out')
        }
    }
    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.25)',
          },
        content: {
            border: '2',
            borderRadius: '16px',
            bottom: 'auto',
            height: '425px', // set height
            left: '50%',
            paddingTop: '0rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            position: 'relative',
            right: 'auto',
            top: '25%', // start from center
            transform: 'translate(-50%,-' + '15px' + ')', // adjust top "up" based on height
            width: '850px',
            backgroundColor: "rgba(137,207,240,0.95)",
            color: "black",
            fontFamily:"Avenir",
            border :"2px solid black",
        },
      };
    const useStyles = makeStyles((theme) => ({
        root: {
          marginTop: "70px",
          maxWidth: 900,
          backgroundColor: "#121212",
          color: "white",
          
        },
        list_root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: "#222",
          },
        search: {
            '& .MuiTextField-search': {
                margin: theme.spacing(1),
                width: 200,
                // color: "white",
              },
        },
        root_left:{
            backgroundColor:"#222",
            color:"white",
            position: 'fixed',
            width:"340px",
            marginTop:"71px",
            marginLeft:"-25px",
            height:"19vw",
        },
        root_right:{
            backgroundColor:"#222",
            color:"white",
            position: 'fixed',
            width:"340px",
            marginTop:"71px",
            marginLeft:"-15px",
            height:"38.3vw",
        },
        left_below:{
            backgroundColor:"#222",
            color:"white",
            position: 'fixed',
            width:"340px",
            marginTop:"365px",
            marginLeft:"-25px",
            height:"18vw",
        },
        but: {
            marginLeft: "43%",
            radius:"20%",
            borderRadius:20
        },
        but2: {
            borderRadius:20
        },
        // for already applied creators
        but3:{
            marginLeft:"33%",
            borderRadius:20,
        },
        media: {
          height: 290,
          borderColor: "primary.main",
          border: '1',
        },
        media_left_below:{
          height: 75,
          width: 75,
          borderColor: "grey",
          border: '10',
          marginLeft:"128px",
          marginTop:"-20px"
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
          },
          expandOpen: {
            transform: 'rotate(180deg)',
          },
          avatar: {
            backgroundColor: red[500],
          },
      }));
    const classes = useStyles();
    const theme = createTheme({
        typography: {
          fontFamily: [
            '-apple-system',
            'Avenir',
          ].join(','),
         
        },
      });
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
    setExpanded(!expanded);
    };
    const [isApproved_MKBHD, setIsApproved_MKBHD] = useState(false);
    const [isApplied_MKBHD, setIsApplied_MKBHD] = useState(false);
    let mkbhd_user_id = "mqdz9k1pRICP0dwOe7iu";
    useEffect(async () => {
        const person = { username: currentUser.displayName, creator_name: "MKBHD" , event_id: 0};
        await axios
            .post("http://localhost:9000/checkapplied", person)
            .then((res) => {
            // console.log(res);
            // console.log(res.data);
            setIsApproved_MKBHD(res.data)
            console.log(res.data)
            })
            .catch((err) => {
            console.log(err);
            });
    }, [])
    async function handleRegisterMKBHD() {
        const person = { username: currentUser.displayName, creator_name: "MKBHD" , event_id: 0, user_id: currentUser.uid};
        await axios
            .post("http://localhost:9000/registrationFlow", person)
            .then((res) => {
            // console.log(res);
            // console.log(res.data);
            console.log(res.data)
            setIsApplied_MKBHD(true)
            })
            .catch((err) => {
            console.log(err);
            });
    }
    return (
        <div>
            <div className="navbar">
                {/* <ul>
                    <li style = {{float: "left", display: "block", padding: "8px", borderRadius:"17px", fontFamily: "Avenir", marginLeft: "-32px"}}>Movie</li>
                    <li style = {{float: "left", display: "block", padding: "8px", borderRadius:"17px", fontFamily: "Avenir", marginLeft:"5px"}}>Science</li>
                    <li style = {{float: "left", display: "block", padding: "8px", borderRadius:"17px", fontFamily: "Avenir", marginLeft:"5px"}}>Food</li>
                    <li style = {{float: "left", display: "block", padding: "8px", borderRadius:"17px", fontFamily: "Avenir", marginLeft:"5px"}}>Comedy</li>
                    <li style = {{float: "left", display: "block", padding: "8px", borderRadius:"17px", fontFamily: "Avenir", marginLeft:"5px"}}>Sports</li>
                </ul> */}
                    {/* <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong>Email:</strong> {currentUser.email}
                            <Link to='/update-profile' className="btn btn-primary w-100 mt-3">Update Profile</Link>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Button variant="link" onClick = {handleLogOut}>Log Out</Button>
                    </div> */}
            </div>
            <div style={{display: "flex", position:"fixed", zIndex:2, width:"100%", backgroundColor:"black", marginTop:"-19px", height:"95px", marginLeft:"-50px", borderColor:"grey"}}>
                <div style={{float:"left", marginTop:"3px", marginLeft:"622.5px"}}>
                    <img src={Logo} width="180" height="100" />
                </div>
                <div style={{float:"left",marginTop:"5px"}}>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"></link>
                    <form action="" style={{marginLeft:"-662px"}}>
                        <input type="search"></input>
                        <i class="fa fa-search"></i>
                    </form>
                </div>
            </div>
            <div className="container">
            <div className="row" >
                <div className="col-sm">
                    <Card className={classes.root_left} style={{backgroundImage:"linear-gradient(0deg, #56ab2f , #a8e063)"}}>
                    <CardActionArea>
                                    <CardContent>
                                    <MuiThemeProvider theme={theme}>
                                        <center>
                                        <Typography gutterBottom variant="h5" component="h2" style={{textTransform:'lowercase', fontSize:"40px", fontWeight:"800", color:"black"}}>
                                            PROFILE
                                        </Typography>
                                        </center>
                                    </MuiThemeProvider>
                                    </CardContent>
                                    <CardMedia
                                    className={classes.media_left_below}
                                    image={Hippo}
                                    title="Hippo"
                                    />
                    </CardActionArea>
                                {/* <CardActions style={{height:"500"}} >
                                    Hello {currentUser.displayName}
                                </CardActions> */}
                                <CardActions style={{height:"500"}} >
                                    <Button size="small" onClick = {handleLogOut} className={classes.but2} variant="contained" color="black" style={{marginLeft:"116px", marginTop:"7px",}}>Log Out</Button>
                                </CardActions>
                              
                    </Card>
                    <Card className={classes.left_below} style={{backgroundImage:"linear-gradient(180deg, #36d1dc , #5b86e5)"}}> 
                    {/* , borderRadius:10 */}
                    <CardActionArea>
                                    <CardContent>
                                    <MuiThemeProvider theme={theme}>
                                        <center>
                                        <Typography gutterBottom variant="h5" component="h2" style={{color:"black", fontWeight:"800", textTransform: 'lowercase', fontSize:"40px", marginTop:"-10px"}}>
                                            GENRE
                                        </Typography>
                                        </center>
                                    </MuiThemeProvider>
                                    </CardContent>
                    </CardActionArea>
                                <CardActions style={{height:"500", marginTop:"-20px"}}>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    youtube
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    instagram
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    science
                                    </Button>
                                </CardActions>
                                <CardActions style={{height:"500"}}>
                                <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    twitter
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    twitch
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    comedy
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    drama
                                    </Button>
                                </CardActions>
                                
                                <CardActions style={{height:"500"}}>
                                <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    bollywood
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    theatre
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    music
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    dance
                                    </Button>
                                    
                                </CardActions>
                                <CardActions style={{height:"500"}}>
                                <Button size="small" variant="outlined" className={classes.but2} style={{textTransform: 'lowercase', color:"black", borderColor:"black"}}>
                                    tech
                                    </Button>
                                </CardActions>
                    </Card>
                </div>
                <div className="card col-6" style={{backgroundColor:"black", alignItems:"center"}} >
                <Card className={classes.root} style={{backgroundImage:"linear-gradient(0deg, #141e30 , #243b55)"}}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image="https://www.techgeek360.com/wp-content/uploads/2021/01/MKBHD-journey.jpg"
                                    title="MKBHD"
                                    
                                    />
                                    <CardContent>
                                    <MuiThemeProvider theme={theme}>
                                        <center>
                                        
                                        <Typography gutterBottom variant="h5" component="h2" >
                                            MKBHD
                                        </Typography>
                                        
                                        </center>
                                    <Typography variant="body2" color="textSecondary" component="p" color="common.white">
                                    Marques Keith Brownlee, also known professionally as MKBHD, is an American YouTuber and professional ultimate frisbee player, best known for his technology-focused videos as well as his podcast, Waveform: The MKBHD Podcast. The name of his YouTube channel is a concatenation of MKB and HD.
                                    </Typography>
                                    </MuiThemeProvider>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                {!isApproved_MKBHD ? <> <Button size="small" color="secondary" variant="outlined" className={classes.but} onClick={() => setModalIsOpen(!modalIsOpen)}>
                                    Register
                                    </Button> 
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={() => setModalIsOpen(!modalIsOpen)}
                                        style={modalStyle}>
                                        <center><div style={{ padding:"9px"}}><h2>MKBHD</h2></div></center>
                                        <p>₹₹ Price: ₹5000(Max)</p>
                                        <p> <ComputerIcon fontSize="small" style={{marginTop:"-5px"}}></ComputerIcon>  Genre: Tech</p>
                                        <p><AccessTimeIcon fontSize="small" style={{marginTop:"-5px"}}></AccessTimeIcon> Session On: Coming Soon...</p>
                                        <hr style={{color:"black"}}></hr>
                                        <p style={{fontWeight:600}}>Disclaimer: Hipptor sessions consist of exactly 10 registered candidates along with the creator(s). Hipptor’s moderator(s) will be available throughout the session for the purpose of monitoring the decency of the content. Hipptor does not take any responsibility for the views shared in the session(s) by either the creator(s) or the candidates attending the session. Clicking on the register button will not guarantee a meeting with the creator and 10 candidates will be selected from the entire pool of registered candidate(s). Persons involved in the session(s) will be allowed only after they agree to the terms and conditions of Hipptor.</p>
                                        <div>
                                        <center>
                                        {/* <button onClick={() => setModalIsOpen(!modalIsOpen)}>Close</button> */}
                                        <Button variant="contained" onClick={handleRegisterMKBHD}>{!isApplied_MKBHD ? "Agree and Register":"Congratulations!!!, You've Registered"}</Button>
                                        </center>
                                        </div>
                                    </Modal> </>
                                    :<Button className={classes.but3} variant="contained"  style={{color:"white", backgroundColor:"grey" ,alignItems:"center"}} disabled>You've Already Applied</Button>}
                                   
                                </CardActions>
                                <CardActions disableSpacing>
                        
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        color="white"
                        >
                        <ExpandMoreIcon color="secondary" />
                        </IconButton>
                    </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                    <Typography paragraph>Creator Stats</Typography>
                                    <Typography paragraph>
                                        Youtube Subscribers
                                    </Typography>
                                    <Typography paragraph>
                                        Instagram Followers
                                    </Typography>
                                    <Typography paragraph>
                                        Facebook Followers
                                    </Typography>
                                    <Typography>
                                        Twitch Subscribers
                                    </Typography>
                                    </CardContent>
                                </Collapse>
                    </Card>
                            <Card className={classes.root} style={{backgroundImage:"linear-gradient(180deg, #141e30 , #243b55)"}}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image="https://production-clubhouse-avatars.s3.amazonaws.com/532654937_00e8fe51-d0bb-4b66-a74b-1acc92793d5b"
                                    title="Tanay Pratap"
                                    
                                    />
                                    <CardContent>
                                    <MuiThemeProvider theme={theme}>
                                        <center>
                                        
                                        <Typography gutterBottom variant="h5" component="h2" >
                                            Tanay Pratap
                                        </Typography>
                                        
                                        </center>
                                    <Typography variant="body2" color="textSecondary" component="p" color="common.white">
                                    The engineer behind Microsoft Teams, Outlook, and now People Experiences across MS apps.
                                    Works on React, Typescript, Redux, NodeJS, and many more days in and out. Crazy about web performance, security and scale.
                                    </Typography>
                                    </MuiThemeProvider>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="secondary" variant="outlined" className={classes.but}>
                                    Register
                                    </Button>
                                </CardActions>
                                <CardActions disableSpacing>
                        
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        color="white"
                        >
                        <ExpandMoreIcon color="secondary" />
                        </IconButton>
                    </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                    <Typography paragraph>Creator Stats</Typography>
                                    <Typography paragraph>
                                        Youtube Subscribers
                                    </Typography>
                                    <Typography paragraph>
                                        Instagram Followers
                                    </Typography>
                                    <Typography paragraph>
                                        Facebook Followers
                                    </Typography>
                                    <Typography>
                                        Twitch Subscribers
                                    </Typography>
                                    </CardContent>
                                </Collapse>
                    </Card>
                    
                </div>
            <div className="col-sm"> <Card className={classes.root_right} style={{backgroundImage:"linear-gradient(180deg, #ff9966 , #ff5e62)"}}>
                    <CardActionArea>
                                    <CardContent>
                                    <MuiThemeProvider theme={theme}>
                                        <center>
                                        <Typography gutterBottom variant="h5" component="h2" style={{color:"black", marginTop:"15px", textTransform: 'lowercase', fontSize:"40px", fontWeight:"800"}}>
                                         HOT THIS WEEK 
                                        </Typography>
                                        </center>
                                    </MuiThemeProvider>
                                    </CardContent>
                                    <CardMedia
                                    className={classes.media_right}
                                    image={Hippo}
                                    title="Hippo"
                                    />
                    </CardActionArea>
                    <List component="nav" className={classes.list_root} aria-label="mailbox folders" style={{backgroundColor: "rgba(0,0,0,0.00)", color:"black", marginTop:"-20px"}}>
                        <ListItem button style={{fontWeight:"500"}}>
                            <ListItemText primary="Pewdiepie" />
                        </ListItem>
                        <Divider style={{border:"1px solid grey"}}/>
                        <ListItem button>
                            <ListItemText primary="MKBHD"  />
                        </ListItem>
                        <Divider style={{border:"1px solid grey"}}/>
                        <ListItem button>
                            <ListItemText primary="Markiplier" />
                        </ListItem>
                        <Divider style={{border:"1px solid grey"}}/>
                        <ListItem button>
                            <ListItemText primary="Linus Tech Tips" />
                        </ListItem>
                        </List>
                              
                    </Card></div>
            </div>
            </div>
            
       </div>
    )
}
