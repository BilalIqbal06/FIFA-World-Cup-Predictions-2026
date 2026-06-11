# FIFA World Cup 2026 Tournament - Requirements Document

## Overview
This application is a multiplayer prediction tournament for the FIFA World Cup 2026, allowing users to compete with friends by predicting match outcomes and betting on the tournament winner.

## Core Features

### 1. User Onboarding
- **Username Entry**: Users must provide a username before accessing tournament features
- **Username Persistence**: The username is used consistently across all tournaments the user joins
- **Username Validation**: Username must not be empty and has a maximum length limit

### 2. Tournament Creation (Host)
- **Tournament Naming**: Host can assign a custom name to their tournament
- **Invite Code Generation**: System automatically generates a unique 7-digit numeric code
- **Code Regeneration**: Host can regenerate the invite code if needed
- **Host Privileges**: The creator becomes the host with special permissions (start tournament, rename tournament)

### 3. Tournament Joining
- **Code-Based Entry**: Users join tournaments by entering a 7-digit numeric code
- **Code Validation**: System validates that the code is exactly 7 digits
- **Cross-Network Connectivity**: Users can join from different networks using the invite code system

### 4. Lobby Features
- **Tournament Information Display**: Shows tournament name and invite code to all players
- **Player List**: Displays all players in the tournament with their status
- **Host Identification**: Host is marked with a crown icon for easy identification
- **Ready Status Tracking**: Visual indicators show which players are ready
- **Tournament Name Editing**: Host can modify the tournament name at any time

### 5. Betting System
- **Tournament Winner Bet**: Players select one team they believe will win the entire World Cup
- **Team Selection**: Dropdown menu with all 48 participating World Cup teams
- **Bonus Points**: Correct tournament winner prediction awards +20 bonus points
- **No Penalty for Incorrect Bets**: Players do not lose points for incorrect predictions
- **Bet Privacy**: Individual bets are private and not visible to other players
- **Bet Locking**: Once a player marks themselves as ready, their bet cannot be changed
- **Confirmation Warning**: System displays a warning before locking the bet to prevent accidental changes

### 6. Ready System
- **Ready Status**: Players must mark themselves as ready before the tournament can start
- **Prerequisites**: Players must have both a username and a tournament winner bet before readying up
- **Visual Feedback**: Ready players are highlighted with green indicators
- **Permanent Lock**: Ready status and bet are locked once confirmed

### 7. Tournament Start
- **Host Control**: Only the host can initiate the tournament start
- **Synchronized Transition**: All players transition to the tournament screen simultaneously
- **Status Update**: Tournament status changes from "lobby" to "in_progress"

### 8. Match Predictions
- **Match Schedule**: Complete FIFA World Cup 2026 schedule displayed (104 matches)
- **Prediction Options**: For each match, users predict: home team win, away team win, or tie
- **Match Information**: Each match displays:
  - Home and away team names with country flags
  - Match date and time
  - Venue location
  - Group/Stage information
  - Match status (upcoming, live, finished)
- **Point System**: Points awarded based on match importance (higher stakes in later stages)
- **Strategic Gameplay**: Later knockout stage matches are worth more points

### 9. Tournament Stages
The application covers the complete World Cup tournament structure:
- **Group Stage**: 12 groups with 4 teams each (48 matches)
- **Round of 32**: 16 matches
- **Round of 16**: 8 matches
- **Quarter Finals**: 4 matches
- **Semi Finals**: 2 matches
- **Bronze Medal Match**: 1 match
- **Final**: 1 match

### 10. Multiplayer Synchronization
- **Real-Time Updates**: All player actions are synchronized across all participants
- **Player Join Notifications**: All players see when new players join
- **Ready Status Sync**: Ready status updates are reflected for all players
- **Bet Placement Sync**: Bet placements are synchronized (though bet choices remain private)
- **Tournament State Sync**: Tournament start and state changes are synchronized

### 11. Multiple Leagues Support
- **Simultaneous Participation**: Users can participate in multiple tournaments simultaneously
- **League Switching**: Users can switch between active tournaments without leaving
- **League Counter**: Display shows number of active leagues
- **League Switcher Modal**: Interface to select and switch between different tournaments
- **Tournament Status Indication**: Shows which tournaments are in progress
- **Add New League**: Option to join or create additional tournaments from the switcher

### 12. Tournament Screen Features
- **Header Information**: Displays tournament name, current username, and bet status
- **Bet Display**: Shows user's current tournament winner bet with potential bonus
- **Leave Tournament**: Option to leave the current tournament
- **Multiple Leagues Button**: Quick access to league switcher

### 13. Statistics Tracking
- **Player Statistics**: Tracks individual player performance (goals, assists, cards)
- **Team Standings**: Displays team performance in group stages
- **Real-Time Updates**: Statistics update as matches are played
- **API Integration**: Stats fetched from external sports data source (ESPN API)
- **Auto-Refresh**: Statistics refresh automatically at regular intervals

### 14. Team Data
- **48 Participating Teams**: Complete list of all FIFA World Cup 2026 qualified teams
- **Country Flags**: Visual representation of each team with flag emojis
- **Team Identification**: Unique ID system for each team

### 15. Venue Information
- **Multiple Stadiums**: Matches hosted across various North American venues
- **Venue Display**: Each match shows the stadium location

### 16. Tournament Rules Display
- **Objective Explanation**: Clear explanation that the player with most points wins
- **Prediction Rules**: Instructions on how match predictions work
- **Betting System Rules**: Explanation of the tournament winner bet and bonus points
- **Strategy Guidance**: Tips about strategic play in later stages
- **Multiplayer Explanation**: Description of real-time competition features
- **Ready Lock Warning**: Clear warning about permanent bet locking

### 17. User Interface Features
- **Responsive Design**: Works across different screen sizes
- **Visual Feedback**: Color-coded status indicators (green for ready, gray for not ready)
- **Modal Dialogs**: Confirmation dialogs for important actions
- **Loading States**: Visual indicators during data loading
- **Error Handling**: User-friendly error messages for invalid inputs
- **Gradient Themes**: Distinct color themes for different screens (green for host, blue for join, purple for lobby)

### 18. Navigation
- **Back Navigation**: Ability to return to previous screens
- **Screen Flow**: Logical progression from welcome → host/join → lobby → tournament
- **Exit Options**: Users can leave tournaments at any point

### 19. Data Persistence
- **Active Tournament Tracking**: System maintains list of user's active tournaments
- **Player State**: User's player state (username, bet, ready status) is preserved per tournament
- **Tournament State**: Tournament information is maintained across sessions

## Game Rules Summary

### Objective
The player with the most points at the end of the tournament wins.

### Scoring
- **Match Predictions**: Points awarded for correct predictions based on match importance
- **Tournament Winner Bet**: +20 bonus points if the betted team wins the World Cup
- **No Deductions**: Incorrect predictions do not result in point deductions

### Strategy
- **Progressive Stakes**: Later tournament stages (knockout rounds) are worth more points
- **Risk Management**: Players can strategically save their best predictions for important matches
- **Bet Selection**: Choose tournament winner carefully as it's locked once ready

### Multiplayer Competition
- **Real-Time Leaderboard**: Players compete simultaneously with live score tracking
- **Private Predictions**: Individual predictions remain private until results are revealed
- **Synchronized Experience**: All players experience the tournament timeline together

## User Roles

### Host
- Create tournaments with custom names
- Generate and share invite codes
- Modify tournament name
- Start the tournament
- All regular player capabilities

### Player
- Join tournaments via invite code
- Place tournament winner bet
- Mark as ready
- Make match predictions
- View statistics and standings
- Participate in multiple leagues
- Leave tournaments

## Non-Functional Requirements

### Performance
- Real-time synchronization across all players
- Quick response to user actions
- Efficient data loading for statistics

### Usability
- Intuitive navigation flow
- Clear visual indicators
- Helpful instructions and warnings
- Accessible color schemes

### Reliability
- Consistent state across all connected players
- Proper error handling for invalid inputs
- Data integrity during network operations

## Future Enhancements (Potential)
- Actual match result integration
- Live match updates
- Advanced statistics and analytics
- Tournament history
- Chat functionality between players
- Custom scoring rules
- Tournament templates
