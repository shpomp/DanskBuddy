# DanskBuddy — Manual Test Flows

**App URL:** `localhost:5173`  
**3 flows, 3 testers.** Each person picks one flow and works through it independently.

> **Translation feature (Flow 3 only):** Only one tester should run the translation steps — the one who has the Gemini API key configured. This is noted clearly inside Flow 3.

---

## Before you start

1. Open `localhost:5173` in Chrome
2. Open DevTools → **Application** tab → **Local Storage** → `localhost:5173`
3. Select all keys starting with `danskbuddy_` and delete them
4. Refresh the page — seed data reloads automatically
5. Keep DevTools open — you will use it throughout the flow to verify data

**How to inspect localStorage data during the flow:**  
Switch to the **Console** tab in DevTools and paste commands like:
```js
JSON.parse(localStorage.getItem('danskbuddy_users'))
JSON.parse(localStorage.getItem('danskbuddy_matches'))
JSON.parse(localStorage.getItem('danskbuddy_messages'))
```
This gives you an interactive object to inspect. You'll be prompted to do this at key points in each flow.

---

## Seed users (all passwords: `password123`)

| User | Email | Role | Level | City | Existing connections |
|------|-------|------|-------|------|----------------------|
| Maja Nielsen | maja@test.com | Native | Native | Copenhagen | Lars (has messages) |
| Priya Sharma | priya@test.com | Learner | Beginner | Copenhagen | Carlos (has messages) |
| Carlos Mendez | carlos@test.com | Learner | Intermediate | Aarhus | Sofie, Priya (has messages in both) |

---

---

# Flow 1 — Maja Nielsen · Native Speaker

**You are:** Maja, a native Danish speaker in Copenhagen. Two learners have sent you connect requests. You are already connected and chatting with Lars.  
**This flow tests:** Login, managing incoming match requests (accept/decline), messaging, browsing, connecting from a public profile, localStorage verification of match state changes.

**Login:** `maja@test.com` / `password123`

---

**1.** Go to `localhost:5173` → click **Login** → enter credentials → click **Login**

> Lands on Browse. Maja's avatar (👩) and name visible top-right in the navbar.  
> 👁 Is the navbar readable — logo left, links centre, avatar + logout right?

---

**2.** Before touching the app — open the Console and run:
```js
JSON.parse(localStorage.getItem('danskbuddy_matches'))
```
> You should see **6 match objects**. Find the two with `receiverId: "1"` (that's Maja). Both should have `status: "pending"`. Note the `requesterId` values — they are Carlos (id `"7"`) and Priya (id `"6"`).  
> 👁 Do the requester IDs match the names you'll see in the Pending tab?

---

**3.** Click **Matches** in the navbar → look at the **Pending** tab

> Two cards: **Carlos Mendez** and **Priya Sharma**. Each shows avatar, name, city, danish level, bio, and **Accept / Decline** buttons.  
> 👁 Are the Accept and Decline buttons clearly distinct from each other in colour and label?  
> 👁 Do the names and cities on the cards match what you saw in localStorage?

---

**4.** On **Carlos Mendez**'s card → click **Accept**

> A toast briefly appears ("✅ Connected!"). The card updates — Accept/Decline are replaced by **Send Message**.  
> 👁 Does the toast disappear on its own after ~2 seconds?

---

**5.** On **Priya Sharma**'s card → click **Decline**

> Toast: "❌ Declined". Card updates — no action buttons remain.

---

**6.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_matches'))
```
> Find the match where `requesterId: "7"` (Carlos) and `receiverId: "1"` (Maja).  
> **Verify:** `status` is now `"accepted"`.  
> Find the match where `requesterId: "6"` (Priya) and `receiverId: "1"` (Maja).  
> **Verify:** `status` is now `"declined"`.  
> 👁 Do the stored status values match what the UI showed after the accept/decline actions?

---

**7.** Click the **Connected** tab

> Shows **Lars Andersen** and **Carlos Mendez**. Count: **(2)**.  
> 👁 Does each card have a **Send Message** button?

---

**8.** On **Lars Andersen**'s card → click **Send Message**

> Chat with Lars opens. **5 existing messages** visible — a back-and-forth in Danish.  
> 👁 Lars's messages on the **LEFT**, Maja's on the **RIGHT**?  
> 👁 Does the chat header show Lars's name, "Online" chip, role chip, and a level badge?

---

**9.** Type `Hej Lars! Hvad laver du i weekenden?` → press **Enter**

> Message appears on the right. Input clears.

---

**10.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_messages'))['1::2']
```
> This is the Maja (id `1`) ↔ Lars (id `2`) conversation.  
> **Verify:** The last message in the array has `senderId: "1"` and `text: "Hej Lars! Hvad laver du i weekenden?"`.  
> 👁 Does what's stored exactly match what you see displayed in the chat?

---

**11.** Click the **←** back arrow

> Returns to Messages list. Lars's conversation is at the **top** — most recently active.  
> 👁 Does the preview text under Lars's name match the message you just sent?

---

**— VERIFY: match state is consistent across tabs —**

**12.** Click **Matches** → **Pending** tab

> Empty. Both requests were handled. Empty state message shown.

---

**13.** Click **Sent** tab

> Shows Maja's outgoing request to **Anna Hansen** — "Awaiting reply". Carlos and Priya do not appear here.

---

**14.** Click **Declined** tab

> Empty. *(This tab shows only requests Maja sent that were declined by the receiver — not requests she herself declined. Expected behaviour.)*  
> 👁 Is the empty state clearly worded — not looking like an error?

---

**— BROWSE & PUBLIC PROFILE —**

**15.** Click **Browse** in the navbar

> Full user list. Maja herself is **not** in the list.  
> 👁 Does the count "Showing X of X users" look like a sensible number (should be all users minus Maja)?

---

**16.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_users')).find(u => u.id === '1')
```
> This is Maja's own user object.  
> **Verify:** `role`, `city`, `danishLevel`, `topics` match what you see on Browse (i.e. Maja is correctly excluded from the list based on her ID being the current user, not some data mismatch).

---

**17.** Filter by **Role: Native speaker** → then **Availability: Evenings**

> Count reduces. Only native speakers available in evenings shown.  
> 👁 Do the filters work together (AND logic), not independently? Does count update after each change?

---

**18.** Click **Reset filters**

> All dropdowns back to "All". Full list returns. Search field also empty.

---

**19.** Find **Sofie Christensen** → click **View Profile**

> Sofie's public profile: gradient banner at top, avatar circle overlapping it, name, danish level badge (should be dark/native), city (Odense), role, bio, topics (art, books, culture, food), learning goals, availability.  
> 👁 Is all information readable and well laid out — nothing cut off or overlapping?  
> 👁 Connect button shows **"Connect"** (enabled) — Maja has no existing match with Sofie.

---

**20.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_users')).find(u => u.id === '3')
```
> This is Sofie's user object.  
> **Verify:** The `name`, `city`, `danishLevel`, `bio`, and `topics` fields in localStorage match exactly what is displayed on Sofie's public profile page.

---

**21.** Click **Connect** on Sofie's profile page

> Button changes to **"Pending"** and goes disabled immediately.

---

**22.** Click **Back to Browse** → find Sofie's card in the list

> Sofie's Connect button in Browse now shows **"Pending"** (disabled) — consistent with the profile page.  
> 👁 Are button states (Connected / Pending / Connect) visually easy to tell apart at a glance across the page?

---

**23.** Click **Matches** → **Sent** tab

> Now shows **two** sent requests: Anna Hansen and Sofie Christensen. Count: **(2)**.

---

**24.** Click your avatar / name in the top-right navbar → **My Profile**

> Read-only profile: role (Native speaker), city (Copenhagen), danish level (Native), topics (culture, food, travel, daily life), bio, availability.  
> 👁 Is the **Edit profile** button visible? Is the read-only view clearly non-editable?

---

**25.** Click **Log out**

> Redirected to Login page. No Maja data visible.  
> Try navigating to `localhost:5173/browse` in the address bar → redirected back to `/login`.

---

### Flow 1 — Findings

| | |
|---|---|
| **What worked well** | |
| **Issues found** | |
| **localStorage mismatches** | |
| **UI concerns** | |

---

---

# Flow 2 — Priya Sharma · Beginner Learner

**You are:** Priya, a beginner Hindi-speaking learner in Copenhagen. You have one active conversation with Carlos and sent a pending request to Maja.  
**This flow tests:** Messaging an existing connection, checking match states, browsing with filters, sending a new connect request, profile editing, and verifying localStorage reflects every change.

**Login:** `priya@test.com` / `password123`

---

**1.** Go to `localhost:5173` → **Login** → enter credentials → click **Login**

> Browse page loads. Priya's avatar (👩) visible top-right.

---

**2.** Before navigating — open Console and run:
```js
JSON.parse(localStorage.getItem('danskbuddy_users')).find(u => u.id === '6')
```
> This is Priya's user object. Note her current `bio` and `availability` — you'll verify these change after editing later.

---

**3.** Click **Messages** in the navbar

> Conversation list. **Carlos Mendez** appears with a preview of the last message.  
> 👁 Does the preview show readable text — not "[object Object]" or a timestamp only?

---

**4.** Click the **Carlos Mendez** conversation row

> Chat opens. **3 existing messages** visible. Priya's messages on RIGHT, Carlos's on LEFT.  
> 👁 Does the header show Carlos's name, a role chip ("learner"), and a danish level badge?

---

**5.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_messages'))['6::7']
```
> This is the Priya (id `6`) ↔ Carlos (id `7`) conversation. The key is always the two IDs sorted numerically and joined with `::`.  
> **Verify:** There are 3 messages. Check the `senderId` values — Priya is `"6"`, Carlos is `"7"`. Confirm they match the LEFT/RIGHT display in the chat.  
> 👁 Does the message order in localStorage (by `createdAt`) match the top-to-bottom order on screen?

---

**6.** Type `Tak Carlos! Hvad synes du om Aarhus?` → click the red **➤** send button

> Message appears on the right. Input clears.

---

**7.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_messages'))['6::7']
```
> **Verify:** Now has **4 messages**. The last one has `senderId: "6"` and `text: "Tak Carlos! Hvad synes du om Aarhus?"`.  
> 👁 Does the stored message match exactly what's displayed on screen?

---

**8.** Click **←** back

> Messages list. Carlos's conversation is at the **top**. Preview shows the message just sent.

---

**— VERIFY: match state matches messaging —**

**9.** Click **Matches** → **Connected** tab

> Carlos Mendez listed. Count: **(1)**.  
> 👁 Does the Connected card have a **Send Message** button?

---

**10.** Click **Sent** tab

> Maja Nielsen shown — "Awaiting reply". Count: **(1)**.  
> 👁 No Accept/Decline buttons on this card — correct, since Priya is the one who sent the request.

---

**11.** Click **Pending** tab

> Empty — Priya has no incoming requests.

---

**12.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_matches')).filter(m => m.requesterId === '6' || m.receiverId === '6')
```
> Lists all of Priya's matches.  
> **Verify:** One match has `status: "accepted"` (Priya ↔ Carlos). One has `status: "pending"` with `requesterId: "6"` and `receiverId: "1"` (Priya → Maja). This should align exactly with what the Sent and Connected tabs showed.

---

**— BROWSE & CONNECT —**

**13.** Click **Browse** in the navbar

> Browse loads. Priya not in the list. Carlos's card shows **"Connected"** (disabled).  
> 👁 Is "Connected" visually distinct from "Connect" — clearly non-interactive in appearance?

---

**14.** Type `Sofie` in the search field

> Sofie Christensen's card appears. Button shows **"Connect"** (enabled).  
> 👁 Does the count update as you type, not only after pressing Enter?

---

**15.** Click **Connect** on Sofie's card

> Button changes to **"Pending"** instantly.

---

**16.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_matches')).filter(m => m.requesterId === '6' || m.receiverId === '6')
```
> **Verify:** Now shows **3 matches** for Priya. The new one has `requesterId: "6"`, `receiverId: "3"` (Sofie's id), and `status: "pending"`.  
> 👁 Did the new match get a unique `id` and a `createdAt` timestamp?

---

**17.** Filter by **Role: Native speaker** → filter **Danish level: Native**

> Count reduces. Should include Maja, Lars, Sofie, Mikkel, Anna.  
> 👁 Does Sofie's card still show **"Pending"** after filtering — state not reset by filtering?

---

**18.** Click **Reset filters** → search clears too

> Full list returns.

---

**19.** Click **View Profile** on **Sofie Christensen**

> Sofie's public profile. Topics: art, books, culture, food. Bio mentions "Patient with beginners!".  
> 👁 Connect button on the profile page shows **"Pending"** (disabled) — consistent with the Browse card?

---

**20.** Click **Back to Browse** → find **Carlos**'s card

> Carlos shows **"Connected"** (disabled). Consistent with Matches.  
> 👁 All three button states (Connect / Pending / Connected) visible somewhere on this page — do they each look clearly different from each other?

---

**— PROFILE EDIT —**

**21.** Click Priya's avatar in the navbar → **My Profile**

> Read-only view: role (Learner), level (Beginner), city (Copenhagen), language (Hindi), topics (daily life, shopping, work), bio ("Moved to Copenhagen recently. Learning Danish is hard but exciting!"), availability (Weekends).  
> 👁 Does this match the user object you read from localStorage in step 2?

---

**22.** Click **Edit profile**

> Edit form opens. All fields **pre-filled** from current values.  
> 👁 Are the dropdowns showing the correct current selections — not defaulting to the first option?

---

**23.** Clear the bio → type `Beginner learner slowly making progress. Love meeting new people and practicing Danish over coffee!` → change availability to **Flexible** → click **Save profile**

> Form closes. Success banner appears. Updated bio and "Flexible" visible in read-only view.

---

**24.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_users')).find(u => u.id === '6')
```
> **Verify:** The `bio` field now shows the updated text. The `availability` field is now `"flexible"`.  
> 👁 Do the stored values match exactly what is displayed on the profile page?

---

**25.** Click **Edit profile** again

> Bio pre-filled with the **new** text. Availability shows **Flexible**.  
> 👁 Are all other fields (name, city, level, topics) also correctly pre-filled — nothing blank or reverted?

---

**26.** Click **Cancel**

> Returns to read-only view with **saved** values (cancel did not revert the edit).

---

**27.** Click **Log out**

> Redirected to Login. Try `localhost:5173/matches` directly → redirects to `/login`.

---

### Flow 2 — Findings

| | |
|---|---|
| **What worked well** | |
| **Issues found** | |
| **localStorage mismatches** | |
| **UI concerns** | |

---

---

# Flow 3 — Carlos Mendez · Intermediate Learner

**You are:** Carlos, an intermediate Spanish-speaking learner in Aarhus. You have active conversations with both Sofie (4 messages) and Priya (3 messages). You sent a pending request to Maja.  
**This flow tests:** Profile editing, browsing with filters, connecting from a public profile, navigating between two separate conversations, verifying localStorage data, and testing the translation feature.

**Login:** `carlos@test.com` / `password123`

---

> ⚠️ **TRANSLATION SECTION (steps 14–21):** These steps require the Gemini API key to be configured.  
> Before running those steps, verify in the project's `.env` file (or `.env.local`) that `VITE_GEMINI_API_KEY` has a value.  
> If the key is missing or invalid, translation will silently fail (error in console only — no UI error shown). Skip steps 14–21 if you do not have the key.

---

**1.** Go to `localhost:5173` → **Login** with `carlos@test.com` / `password123`

> Browse page loads. Carlos's avatar (👨) in top-right navbar.

---

**— PROFILE EDIT FIRST —**

**2.** Click Carlos's avatar / name → **My Profile**

> Read-only: role (Learner), level (Intermediate), city (Aarhus), language (Spanish), topics (work, technology, culture), bio ("Software engineer improving Danish skills."), availability (Evenings).

---

**3.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_users')).find(u => u.id === '7')
```
> **Verify:** The displayed profile data matches exactly what's in the stored object — every field, including `topics` (an array), `availability`, and `bio`.

---

**4.** Click **Edit profile** → change bio to `Software engineer in Aarhus. Improving my Danish to grow professionally and connect with local colleagues.` → change availability to **Flexible** → click **Save profile**

> Success banner appears. Updated bio and "Flexible" shown in read-only view.

---

**5.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_users')).find(u => u.id === '7')
```
> **Verify:** `bio` is the updated text. `availability` is `"flexible"`.  
> 👁 Do stored values match the profile display exactly?

---

**6.** Click **Edit profile** again → check all fields are pre-filled with saved values → click **Cancel**

> Read-only view returns. Saved values persist (cancel did not revert).

---

**— BROWSE & CONNECT —**

**7.** Click **Browse** in the navbar

> Carlos not in the list. Sofie and Priya show **"Connected"** (disabled).  
> 👁 Are "Connected" buttons visually distinct from active "Connect" buttons?

---

**8.** Filter by **City: Copenhagen** → **Role: Native speaker** → **Danish level: Native**

> Count reduces with each filter applied. Results: Copenhagen-based native-level speakers.  
> 👁 Do filters stack (AND logic), not override each other?

---

**9.** Click **Reset filters** → type `Anna` in search

> Anna Hansen's card appears. Button shows **"Connect"** (enabled).

---

**10.** Click **View Profile** on Anna's card

> Anna's public profile: city Aalborg, role Native, bio "Social worker passionate about helping newcomers.", topics (daily life, culture, work).  
> 👁 Is all the information clear? Is anything missing or "Not added yet"?

---

**11.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_users')).find(u => u.id === '5')
```
> This is Anna's user object (id `5`).  
> **Verify:** The fields displayed on her public profile (`name`, `city`, `danishLevel`, `bio`, `topics`) match the stored values exactly.

---

**12.** Click **Connect** on Anna's profile page

> Button changes to **"Pending"** (disabled) immediately.

---

**13.** Click **Back to Browse** → search `Anna`

> Anna's card shows **"Pending"** — consistent with the profile page.

---

**13a.** Click **Matches** → **Sent** tab

> Two sent requests: **Maja Nielsen** (from seed) and **Anna Hansen** (just added). Count: **(2)**.  
> 👁 Both show "Awaiting reply"?

---

**13b.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_matches')).filter(m => m.requesterId === '7')
```
> Lists all matches Carlos initiated.  
> **Verify:** Two objects — one with `receiverId: "1"` (Maja) and one with `receiverId: "5"` (Anna). Both have `status: "pending"`.

---

**— TRANSLATION FEATURE —**

> ⚠️ Only continue this section if `VITE_GEMINI_API_KEY` is set. If not, skip to step 22.

**14.** Click **Messages** in navbar → click the **Sofie Christensen** conversation

> Chat opens. **4 existing messages** in Danish. Verify messages present:  
> - Carlos: "Hola Sofie! I mean... Hej Sofie!"  
> - Sofie: "Haha, hej Carlos! Du er allerede i gang 😄"  
> - Carlos: "Jeg prøver! Kan du hjælpe mig med bøjning af verber?"  
> - Sofie: "Ja, det kan jeg. Lad os starte med 'at være' og 'at have'."  
> 👁 Do the emoji (😄) and Danish special characters (æ, ø, å) display correctly?

---

**15.** Find Sofie's message **"Haha, hej Carlos! Du er allerede i gang 😄"** → click **Translate** below it

> Button briefly shows **"Translating..."**. Then the message text changes to an English translation. Button label changes to **"Show original"**.  
> 👁 Does the translated text make sense as an English version of "Haha, hi Carlos! You're already at it 😄"?  
> 👁 While translating, is the button disabled / visually loading?

---

**16.** Click **Show original** on the same message

> Message text reverts to the original Danish.  
> 👁 Is the original text identical to what was there before — no character corruption?

---

**17.** Click **Translate** again on the same message

> Translation appears **immediately** — no "Translating..." loading state. (The result was cached from step 15.)  
> 👁 Is the cached translation identical to what was shown in step 15?

---

**18.** Find Carlos's own message **"Jeg prøver! Kan du hjælpe mig med bøjning af verber?"** → click **Translate**

> Translates to English (something like "I'm trying! Can you help me with verb conjugation?").  
> 👁 Does translation work on your own sent messages (right-aligned bubbles) as well as received ones?

---

**19.** Find the mixed-language message **"Hola Sofie! I mean... Hej Sofie!"** → click **Translate**

> API detects the language and translates. Result will vary — note what the API returns.  
> 👁 Does it handle mixed-language content without crashing?  
> Note the translation result here: ___________

---

**20.** Open Console → check for any errors

> There should be **no errors** in the console from the translation calls.  
> 👁 If you see `Translation failed: 4xx` — the API key is likely invalid or over quota.

---

**21.** Type a new message: `Jeg glæder mig til at lære mere!` → send → click **Translate** on it

> Translates to English ("I look forward to learning more!" or similar).  
> 👁 Does translation work on messages sent during this session, not just pre-seeded ones?

---

**— SECOND CONVERSATION & VERIFICATION —**

**22.** Click **←** back → click **Priya Sharma** conversation

> Chat opens. 3 existing messages (Danish). Priya's on LEFT, Carlos's on RIGHT.  
> 👁 Are these messages completely separate from Sofie's — no cross-contamination?

---

**23.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_messages'))
```
> You should see an object with keys: `"1::2"` (Maja–Lars), `"3::7"` (Sofie–Carlos), `"6::7"` (Priya–Carlos), and any new ones created during this session.  
> **Verify:** The `"3::7"` array and `"6::7"` array are completely separate — no messages appear in both.  
> **Verify:** The `"3::7"` key contains the messages you saw in Sofie's chat (including any you sent in step 21).

---

**24.** Type `Kæmper du stadig med udtale?` → send → click **←** back

> Messages list. Priya now at the top (most recently messaged). Sofie second.  
> 👁 Is the ordering clearly most-recently-active first?

---

**25.** Run in Console:
```js
JSON.parse(localStorage.getItem('danskbuddy_messages'))['6::7']
```
> **Verify:** Last message in the array is `senderId: "7"` and `text: "Kæmper du stadig med udtale?"`.

---

**26.** Click **Matches** → **Connected** tab → click **Send Message** on Priya

> Opens Priya's chat. The message from step 24 is visible at the bottom — navigating from Matches into the same conversation gives the same view as from Messages.  
> 👁 Did navigating from Matches rather than Messages feel natural? Same chat, same history?

---

**27.** Click **←** back → click **Browse** → find Priya's card

> Priya shows **"Connected"** (disabled). Consistent with Matches tab.

---

**28.** Click **Log out**

> Redirected to Login. Try `localhost:5173/messages` directly → redirects to `/login`.

---

### Flow 3 — Findings

| | |
|---|---|
| **What worked well** | |
| **Issues found** | |
| **localStorage mismatches** | |
| **Translation behaviour** | |
| **UI concerns** | |

---

---

## Known behaviour (not bugs)

| # | What you see | Why it's expected |
|---|---|---|
| 1 | Declined tab is empty after you decline someone | Only shows requests *you sent* that were declined — not ones you declined yourself |
| 2 | Phone and video icons in chat do nothing on click | UI placeholder — no call functionality yet |
| 3 | Feed page shows "coming soon" | Not yet built |
| 4 | Chat opens even without an accepted match | No route guard on `/messages/:userId` — known gap |
| 5 | Translation errors only appear in console | No user-facing error message when the API fails — known gap |
| 6 | Translate button shows on every message, sent and received | By design — translation works in both directions |
