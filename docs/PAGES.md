# Pages reference

The site is made of 9 pages. All share the injected header/footer and the
`assets/css/styles.css` stylesheet.

| File | `data-page` | Purpose |
| --- | --- | --- |
| `index.html` | `home` | Landing page — hero, "reasons to start", feature cards, CTA |
| `about.html` | `about` | About the gym — feature cards + mission |
| `gallery.html` | `gallery` | Photo grid with a lightbox |
| `booking.html` | `booking` | Membership plans + booking form with live price |
| `contact.html` | `contact` | Contact details + Google Maps embed |
| `login.html` | — | Sign in form |
| `signup.html` | — | Create account form |
| `admin-login.html` | — | Admin sign in |
| `admin.html` | — | Admin dashboard (demo actions) |

## Navigation graph

```
        ┌─────────────────────────── header (every page) ───────────────────────────┐
        │  Home → index   About → about   Gallery → gallery                          │
        │  Membership → booking   Contact → contact   [Login] → login                │
        └───────────────────────────────────────────────────────────────────────────┘

index ──(Join Now)──► signup ──► login ──► index
index ──(View Memberships / Book Now)──► booking
login ──(Sign up)──► signup
footer ──► admin-login ──► admin ──(Log out)──► index
```

## Forms

### Login (`login.html`, `#loginForm`)
| Field | Rule |
| --- | --- |
| `email` | required, must match email regex |
| `password` | required |

On success: toast + redirect to `index.html`. Includes a show/hide password
toggle and Facebook/Twitter social buttons (decorative links).

### Sign up (`signup.html`, `#signupForm`)
| Field | Rule |
| --- | --- |
| `firstname`, `lastname` | required |
| `email` | required, valid format |
| `password` | required, min 6 characters |
| `confirm` | required, must equal `password` |
| `birthday` | required |
| `gender` | radio (male / female / other) |

On success: toast + redirect to `login.html`.

> **Note:** in the original 2020 version the gender radio labels were swapped
> (the "Male" label was tied to the `female` value). This is fixed here.

### Booking (`booking.html`, `#bookingForm`)
| Field | Rule |
| --- | --- |
| `fullname` | required |
| `startdate` | required |
| `plan` | radio: 600 / 1200 / 1800 / 2800 / 4000 EGP |
| `payment` | radio: Cash / Credit card |

The price summary (`#summaryPrice`) updates live as the plan changes. On
success: toast with the chosen amount + redirect to `index.html`.

### Admin login (`admin-login.html`, `#adminForm`)
| Field | Rule |
| --- | --- |
| `username` | required |
| `password` | required |

On success: redirect to `admin.html`. The dashboard tiles are demo actions that
show a toast (no backend).

## Assets

```
assets/img/
├── logo.jpeg, icon.jpeg        ← brand + favicon
├── wallpaper1.jpeg             ← auth pages background
├── wallpaper2.jpeg             ← hero background
├── facebook.png, twitter.jpg   ← social buttons
├── location.png, earth.png, phone.png  ← contact icons
└── gallery/1.jpeg … 10.jpeg    ← gallery photos
```
