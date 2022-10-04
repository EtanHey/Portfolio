//basic workflow imports:
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
//styling imports:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//mui ->
import {
  Button,
  TextField,
  FormGroup,
  AppBar,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Typography,
  FormControl,
  Collapse,
  Container,
  CssBaseline,
  Stack,
  Switch,
  FormControlLabel,
  Toolbar,
  CardHeader,
  Avatar,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, red, green, blue, purple, common } from "@mui/material/colors";
import { Delete, DriveFileRenameOutline, Send } from "@mui/icons-material";
//website logo import:
import { ReactComponent as Logo } from "../views/styles/FakeBook.svg";

// new posts must
interface PostInfoProps {
  ownerId: string;
  content: string;
  time: boolean;
  _id: string;
  ownerFirstName: string;
  ownerLastName: string;
}

// receiving props:
interface PostsProps {
  setPostsList: Function;
  post: PostInfoProps;
  theme: any;
  lightTheme: any;
  darkTheme: any;
  handleGetPostsList: Function;
}

function Post(props: PostsProps) {
  const navigate = useNavigate();
  const { setPostsList, post, theme, lightTheme, darkTheme, handleGetPostsList } = props;
  const Initials =
    post.ownerFirstName.charAt(0).toUpperCase() +
    post.ownerLastName.charAt(0).toUpperCase();

  if (theme) {
    var { primary, secondary, background } = lightTheme.palette;
  } else {
    var { primary, secondary, background } = darkTheme.palette;
  }

  function handleOpenPostOwnersProfile(ev: any) {
    // navigate(`/HomePage/Profile/${userId}`);
    
  }

  async function handleDeletePost(id:string) {
    try {
      const {data} = await axios.post('/api/posts/delete-post', {_id:id})
      const {ok} = data;
      if(ok){
        handleGetPostsList();
      }
      
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <Card
      raised
      style={{
        color: primary.contrastText,
        backgroundColor: background.default,
        textAlign: "left",
        // width: 680,
        // maxWidth: 680,
        minHeight: 194.094,
        // paddingLeft: 16,
        // paddingRight: 16,
        // paddingTop: 12,
      }}
    >
      <CardHeader
        color={primary.contrastText}
        style={{ textAlign: "left" }}
        avatar={
          <Link className="post__posterName" to={`/HomePage/Profile/${post.ownerId}`}><Avatar onClick={handleOpenPostOwnersProfile}
            sx={{
              color: theme ? primary.contrastText : primary.main,
              bgcolor: theme ? primary.dark : secondary.main,
            }}
          >
            {Initials}
          </Avatar></Link>
        }
        title={
          <Link className="post__posterName" to={`/HomePage/Profile/${post.ownerId}`} onClick={handleOpenPostOwnersProfile}>
          <h2>  {post.ownerFirstName} {post.ownerLastName}</h2>
          </Link>
        }
        subheader={<Typography color="primary">{post.time}</Typography>}
        action={
          <Button
            color="primary"
            onClick={() => {
              handleDeletePost(post._id);
            }}
          >
            <FontAwesomeIcon size="xs" icon={["fas", "trash"]} />
          </Button>
        }
      ></CardHeader>
      <CardContent>{post.content}</CardContent>
    </Card>
  );
}

export default Post;
