import React from 'react';
import Home from './components/Home/Home';
import ArticleBind9 from './components/ArticleBind9/ArticleBind9';
import Navigation from './components/Navigation/Navigation';
import CommentInput from './components/CommentInput/CommentInput';
import SideNavigation from './components/SideNavigation/SideNavigation';
import AlphaLogin from './components/AlphaLogin/AlphaLogin';

// Function to add our give data into cache
const addDataIntoCache = (cacheName, url, response) => {
  // Converting our response into Actual Response form
  const data = new Response(JSON.stringify(response));

  if ('caches' in window) {
    // Opening given cache and putting our data into it
    caches.open(cacheName).then((cache) => {
      cache.put(url, data);
      alert('Data Added into cache!')
    });
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        inputComment: '',
        generatedAnswer: "BIND or BIND 9 is an open source implementation of DNS, available for almost all Linux distributions. BIND stands Berkeley Internet Name Domain & it allows us to publish DNS information on internet as well as allows us to resolve DNS queries for the users. BIND is by far the most used DNS software on Internet.",
        messageHistory: [{"role": "system", "content": "Write every answer so that it looks like a blog article."}],
        loggedIn: false,
        route: 'login'
    }
  }

  getSingleCacheData = async (cacheName, url) => {
    if (typeof caches === 'undefined') return false;
    
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);
    
    // If no cache exists
    if (!cachedResponse || !cachedResponse.ok) {
      console.log('No cache found!')
    }
  
    return cachedResponse.json().then((item) => {
      this.setState({ route: item })
    });
  };
  
  componentDidMount() {
    console.log('Test Mout');
    this.getSingleCacheData("OTAC", 'http://jusi-dev.ddns.net:3000')
  }

  verifyOTAC = (inputValue) => {
    fetch('http://jusi-dev.ddns.net:3030/api/checkOTAC', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          OTAC: inputValue
        })
      })
        .then(response => response.json())
        .then((data) => {
          if (data === 'success') {
            alert("Login successfull!")
            this.setState({ route: 'home' }, () => {
              console.log("Logged in: ", this.state.loggedIn);
              addDataIntoCache('OTAC', 'http://jusi-dev.ddns.net:3000', this.state.route)
            })
          }
        })
        .catch(error => alert("Something went wrong! ", error))
  }

  commentApply = (inputValue) => {
    this.setState({ inputComment: inputValue }, () => {
      console.log(this.state.inputComment);
      this.state.messageHistory.push({ "role": "user", "content": this.state.inputComment });
      console.log(this.state.messageHistory)

      fetch('http://jusi-dev.ddns.net:3030/api/getReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messageHistory: this.state.messageHistory
        })
      })
        .then(response => response.json())
        .then((data) => {
          let matchCount = 0;
          this.state.messageHistory.push(data);
          const msgContent = data.content;
          let editedContent = msgContent.replace(/```/g, function(matched){
            matchCount++;
            return (matchCount % 2 === 0 ? "</code></div>" : "<div class='bg-gray-800 rounded-lg p-4 mt-4'><code class='text-cyan-300'>");
          });
          this.setState({ generatedAnswer: editedContent});
          alert("DEBUG: Comment posted successfully! ;)");
        })
        .catch((error) => {
          console.error(error);
          alert(error);
      })
    });
  }

  render() {
    return (
      <div className="App bg-neutral-200 pt-24 h-full overflow-x-hidden">
        <Navigation />
        {/* <Home /> */}
        { this.state.route === 'home'
          ? <div>
              <div className='flex flex-row'>
                <ArticleBind9 generatedAnswer={this.state.generatedAnswer} />
                <SideNavigation />
              </div>
              <CommentInput commentInput={this.commentApply} />
            </div>
          :
            <AlphaLogin verifyOTAC={this.verifyOTAC}/>
        }
      </div>
    );
  }
}
  

export default App;
