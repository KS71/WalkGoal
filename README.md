# 🚶‍♂️ WalkGoal

100% vibe code

**Note:** Please note that there are still features that have not yet been installed, but the app works perfectly fine.

A user-friendly Android app (.apk) designed to help you track your walks, set personal goals, and keep track of them. The app is built with a focus on a beautiful, responsive design and a seamless mobile user experience.

> **Note:** WalkGoal does *not* use your phone's GPS to automatically track your walks. You must use another device (like a smartwatch or another tracking app) to record your distance and then manually log it in WalkGoal.

---

## 📸 Screenshots

<div align="center">
  <img src="001.jpg" width="300" alt="Dashboard" />
</div>
<br />
<div align="center">
  <img src="003.jpg" width="300" alt="History" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="004.jpg" width="300" alt="Settings" />
</div>
<br />
<div align="center">
  <img src="006.jpg" width="300" alt="Goal Setup 2" />
</div>
<br />
<div align="center">
  <img src="002a.jpg" width="300" alt="New Screenshot 1" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="002b.jpg" width="300" alt="New Screenshot 2" />
</div>
<br />
<div align="center">
  <img src="005a.jpg" width="300" alt="New Screenshot 3" />
</div>

---

## ✨ Features

- **📊 Dashboard:** Get a full overview of your daily, weekly, and monthly progress directly on the front page.
- **🎯 Goals:** Set personal goals for how much you want to walk per week, month, and year, and track how close you are to reaching them.
- **📝 Log Walk:** Easy and quick logging of the distance you've walked on your latest trips.
- **📅 History:** Coming in the next version.
- **⚙️ Settings:** Customize the app to your needs and easily delete your data.
- **📱 Android App (.apk):** Built as a native app via Capacitor, ready to install on your Android phone.

## 🔒 Data & Privacy

WalkGoal is built with a 100% focus on your privacy:
- **No Server:** The app sends **no** data, logs, or personal information to a cloud server.
- **Your Data is Yours:** Everything you enter (how far you walk, times, goals, etc.) is saved **locally on your own phone**. No one else but you has access to it.
- **Remember Backups:** Because the data is only on your device, it is **very important** that you regularly use the app's built-in "Backup" feature ("Export Data" in Settings). If you lose your phone or delete the app, your data is gone unless you have a backup file!
- **Future Account Management:** We are considering adding some form of account management in the future. Because this would require an online server (and thus go against the app's current core philosophy of 100% local data storage), it hasn't been finally decided yet. If it is ever developed, it will most likely be introduced as an active, voluntary choice (opt-in), so you can continue to use the app 100% locally and privately if you prefer.

## 🛠️ Technologies

The project is built with modern web technologies to ensure the best performance and experience:

- **Frontend Framework:** React 18
- **Programming Language:** TypeScript
- **Styling:** Tailwind CSS (with custom color themes)
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Mobile/Native App:** Capacitor (Built for Android / APK)

## 🚀 Getting Started (Run Locally)

To run the project locally on your own machine:

1. **Clone the project:**
   ```bash
   git clone https://github.com/KS71/WalkGoal.git
   ```
2. **Enter the folder:**
   ```bash
   cd WalkGoal
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the app:**
   ```bash
   npm run dev
   ```

## 👨‍💻 Development & History

The app is continuously updated.

**v2.1.4:**
- **Monthly History Grouping:** Walks in the History tab are now automatically grouped by month with collapsible sections.
- **Monthly Totals:** Each month now displays the total distance walked directly in the header.
- **Auto-Expand:** The most recent month is automatically expanded for quick access.

**v2.1.3:**
- Added the ability to manually select the time of the walk instead of defaulting to 'Now'.
- Implemented a festive "Goal Reached" graphic when progress reaches 100% or more.

**v2.1.1:**
- Added Settings navigation to sub-headers (Log Walk, Goal Setup, History).
- Added Last Backup date display with 12h/24h format support in Settings.
- Added a brand new Yearly Overview Statistics screen.
- Improved header styling across all pages to prevent overlap with the Android status bar.
