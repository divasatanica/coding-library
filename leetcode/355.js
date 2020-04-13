/**
 * Initialize your data structure here.
 */
let timeId = 1;
var Twitter = function() {
    this.followMap = {};
    this.postMap = {};
};

/**
 * Compose a new tweet. 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    const newTweet = {
        tweetId,
        timeId: timeId ++
    };
    if (this.postMap[userId]) {
        this.postMap[userId].push(newTweet);
    } else {
        this.postMap[userId] = [ newTweet ];
    }
};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    const res = [];
    const followee = this.followMap[userId] || [];
    const users = [...new Set([userId, ...followee])];
    
    const posts = users.reduce((acc, curr) => {
        const post = this.postMap[curr] || [];

        return [...acc, ...post];
    }, []);

    posts.sort((a, b) => b.timeId - a.timeId);

    let i = 0;

    while (i < 10) {
        const tweet = posts[i];
        if (!tweet) {
            return res;
        }
        res.push(tweet.tweetId);
        i ++;
    }

    return res;
};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    if (this.followMap[followerId]) {
        this.followMap[followerId].push(followeeId);
    } else {
        this.followMap[followerId] = [ followeeId ];
    }
};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (!this.followMap[followerId]) {
        return;
    }
    this.followMap[followerId] = this.followMap[followerId].filter(i => i !== followeeId);
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

const twitter = new Twitter();

// 用户1发送了一条新推文 (用户id = 1, 推文id = 5).
twitter.postTweet(1, 5);

// 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
console.log(twitter.getNewsFeed(1));

// 用户1关注了用户2.
twitter.follow(1, 2);

// 用户2发送了一个新推文 (推文id = 6).
twitter.postTweet(2, 6);

// 用户1的获取推文应当返回一个列表，其中包含两个推文，id分别为 -> [6, 5].
// 推文id6应当在推文id5之前，因为它是在5之后发送的.
console.log(twitter.getNewsFeed(1));

// 用户1取消关注了用户2.
twitter.unfollow(1, 2);

// 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
// 因为用户1已经不再关注用户2.
console.log(twitter.getNewsFeed(1));