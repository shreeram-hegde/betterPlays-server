import User from "../model/User.js";
import Game from "../model/Game.js";

const handleGameData = async (req, res) => {
  try {
    const { id, title, background_image, tab } = req.body;
    const username = req.user; // from JWT middleware

    if (!id || !title) return res.status(400).json({ message: "Game id and title are required" });

    const DataTabs = ["currentlyPlaying", "completedGames", "wishList"];

    //verify if the tab name sent is correct
    if(!DataTabs.includes(tab)) return res.status(400).json({"message": "Invalid tab name"});

    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return res.status(404).json({ error: "User not found" });

    // ensure game exists
    let game = await Game.findOne({ id }).exec();
    if (!game) {
      game = new Game({ id, title, background_image });
      await game.save();
    }else{
        //check if the game already exists in the given tab for the given user
        const alreadyExists = foundUser[tab].some(
                    (entry) => entry.game.toString() === game._id.toString());
        if(alreadyExists) return res.status(409).json({"error": "Its already in the given tab"});
    }

   
    // remove the game from all the tabs
    DataTabs.forEach(t => {
      foundUser[t] = foundUser[t].filter(entry => entry.game.toString() !== game._id.toString());
    });

    // adding the game to the selected tab
    foundUser[tab].push({ game: game._id, dateAdded: new Date() });
    
    await foundUser.save();

    res.status(200).json({ message: `Game moved to ${tab}`, game });
  } catch (err) {
    console.error("Error handling game data:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export default handleGameData;
