require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const cron = require('node-cron');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const dsaProblems = [
    { name: "Two Sum", link: "https://leetcode.com/problems/two-sum/" },
    { name: "Add Two Numbers", link: "https://leetcode.com/problems/add-two-numbers/" },
    { name: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { name: "Median of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    { name: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { name: "Zigzag Conversion", link: "https://leetcode.com/problems/zigzag-conversion/" },
    { name: "Reverse Integer", link: "https://leetcode.com/problems/reverse-integer/" },
    { name: "String to Integer (atoi)", link: "https://leetcode.com/problems/string-to-integer-atoi/" },
    { name: "Palindrome Number", link: "https://leetcode.com/problems/palindrome-number/" },
    { name: "Container With Most Water", link: "https://leetcode.com/problems/container-with-most-water/" },
    { name: "Integer to Roman", link: "https://leetcode.com/problems/integer-to-roman/" },
    { name: "Roman to Integer", link: "https://leetcode.com/problems/roman-to-integer/" },
    { name: "Longest Common Prefix", link: "https://leetcode.com/problems/longest-common-prefix/" },
    { name: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/" },
    { name: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { name: "Remove Duplicates from Sorted Array", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
    { name: "Remove Element", link: "https://leetcode.com/problems/remove-element/" },
    { name: "Implement strStr()", link: "https://leetcode.com/problems/implement-strstr/" },
    { name: "Search Insert Position", link: "https://leetcode.com/problems/search-insert-position/" },
    { name: "Count and Say", link: "https://leetcode.com/problems/count-and-say/" },
    { name: "Maximum Subarray", link: "https://leetcode.com/problems/maximum-subarray/" },
    { name: "Length of Last Word", link: "https://leetcode.com/problems/length-of-last-word/" },
    { name: "Plus One", link: "https://leetcode.com/problems/plus-one/" },
    { name: "Add Binary", link: "https://leetcode.com/problems/add-binary/" },
    { name: "Sqrt(x)", link: "https://leetcode.com/problems/sqrtx/" },
    { name: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/" },
    { name: "Remove Duplicates from Sorted List", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/" },
    { name: "Merge Sorted Array", link: "https://leetcode.com/problems/merge-sorted-array/" },
    { name: "Binary Tree Inorder Traversal", link: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
    { name: "Symmetric Tree", link: "https://leetcode.com/problems/symmetric-tree/" },
    { name: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
    { name: "Convert Sorted Array to Binary Search Tree", link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
    { name: "Balanced Binary Tree", link: "https://leetcode.com/problems/balanced-binary-tree/" },
    { name: "Minimum Depth of Binary Tree", link: "https://leetcode.com/problems/minimum-depth-of-binary-tree/" },
    { name: "Path Sum", link: "https://leetcode.com/problems/path-sum/" },
    { name: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { name: "Valid Palindrome", link: "https://leetcode.com/problems/valid-palindrome/" },
    { name: "Single Number", link: "https://leetcode.com/problems/single-number/" },
    { name: "Linked List Cycle", link: "https://leetcode.com/problems/linked-list-cycle/" },
    { name: "Intersection of Two Linked Lists", link: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
    { name: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/" },
    { name: "Remove Linked List Elements", link: "https://leetcode.com/problems/remove-linked-list-elements/" },
    { name: "Palindrome Linked List", link: "https://leetcode.com/problems/palindrome-linked-list/" },
    { name: "Delete Node in a Linked List", link: "https://leetcode.com/problems/delete-node-in-a-linked-list/" },
    { name: "Majority Element", link: "https://leetcode.com/problems/majority-element/" },
    { name: "Excel Sheet Column Number", link: "https://leetcode.com/problems/excel-sheet-column-number/" },
    { name: "Power of Two", link: "https://leetcode.com/problems/power-of-two/" },
    { name: "Move Zeroes", link: "https://leetcode.com/problems/move-zeroes/" },
    { name: "Find the Difference", link: "https://leetcode.com/problems/find-the-difference/" },
    { name: "First Unique Character in a String", link: "https://leetcode.com/problems/first-unique-character-in-a-string/" },
    { name: "Ransom Note", link: "https://leetcode.com/problems/ransom-note/" },
    { name: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/" },
    { name: "Island Perimeter", link: "https://leetcode.com/problems/island-perimeter/" },
    { name: "Flood Fill", link: "https://leetcode.com/problems/flood-fill/" },
    { name: "Minimum Absolute Difference in BST", link: "https://leetcode.com/problems/minimum-absolute-difference-in-bst/" },
    { name: "Range Sum of BST", link: "https://leetcode.com/problems/range-sum-of-bst/" },
    { name: "Subtree of Another Tree", link: "https://leetcode.com/problems/subtree-of-another-tree/" },
    { name: "Lowest Common Ancestor of a BST", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
    { name: "Search in a Binary Search Tree", link: "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
    { name: "Sum of Left Leaves", link: "https://leetcode.com/problems/sum-of-left-leaves/" },
    { name: "Invert Binary Tree", link: "https://leetcode.com/problems/invert-binary-tree/" },
    { name: "Same Tree", link: "https://leetcode.com/problems/same-tree/" },
    { name: "Maximum Depth of N-ary Tree", link: "https://leetcode.com/problems/maximum-depth-of-n-ary-tree/" },
    { name: "Kids With the Greatest Number of Candies", link: "https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/" },
    { name: "Running Sum of 1d Array", link: "https://leetcode.com/problems/running-sum-of-1d-array/" },
    { name: "Shuffle the Array", link: "https://leetcode.com/problems/shuffle-the-array/" },
    { name: "Defanging an IP Address", link: "https://leetcode.com/problems/defanging-an-ip-address/" },
    { name: "Jewels and Stones", link: "https://leetcode.com/problems/jewels-and-stones/" },
    { name: "Number of Good Pairs", link: "https://leetcode.com/problems/number-of-good-pairs/" },
    { name: "Count Items Matching a Rule", link: "https://leetcode.com/problems/count-items-matching-a-rule/" },
    { name: "Goal Parser Interpretation", link: "https://leetcode.com/problems/goal-parser-interpretation/" },
    { name: "Concatenation of Array", link: "https://leetcode.com/problems/concatenation-of-array/" },
    { name: "Create Target Array in the Given Order", link: "https://leetcode.com/problems/create-target-array-in-the-given-order/" },
    { name: "How Many Numbers Are Smaller Than the Current Number", link: "https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/" },
    { name: "Subtract the Product and Sum of Digits of an Integer", link: "https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/" },
    { name: "Smaller Numbers Than Current", link: "https://leetcode.com/problems/smaller-numbers-than-current/" },
    { name: "To Lower Case", link: "https://leetcode.com/problems/to-lower-case/" },
    { name: "Check If Two String Arrays are Equivalent", link: "https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/" },
    { name: "Split a String in Balanced Strings", link: "https://leetcode.com/problems/split-a-string-in-balanced-strings/" },
    { name: "Maximum 69 Number", link: "https://leetcode.com/problems/maximum-69-number/" }
  ];
  

// When bot is ready
client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // Schedule a task every day at 8:00 PM
  cron.schedule('0 20 * * *', async () => {
    const channel = await client.channels.fetch('YOUR_CHANNEL_ID'); // Replace with your channel ID

    const dsa = dsaProblems[Math.floor(Math.random() * dsaProblems.length)];
    
    const message = `🕗 **It's 8 PM! Time to solve today's DSA Problem:**\n\n` +
                    `🌟 **Problem:** ${dsa.name}\n` +
                    `🔗 **Link:** ${dsa.link}`;

    await channel.send(message);
    console.log(`✅ Daily DSA notification sent at 8 PM.`);
  }, {
    timezone: "Asia/Kolkata" // Set your timezone here (India Standard Time)
  });
});

client.login(process.env.TOKEN);
