import matplotlib.pyplot as plt
import numpy as np

# Eksempeldata: Sykkeltilgjengelighet på to stasjoner gjennom 24 timer
tid = np.linspace(0, 24, 100)  # Tid i timer
stasjon_1 = 20 + 10 * np.sin(tid / 3)  # Tilgjengelighet ved stasjon 1
stasjon_2 = 15 + 12 * np.sin(tid / 2.5)  # Tilgjengelighet ved stasjon 2

# Lag grafen
fig, ax = plt.subplots()
ax.plot(tid, stasjon_1, label='Stasjon 1')
ax.plot(tid, stasjon_2, label='Stasjon 2')

# Legg til etiketter og tittel
ax.set_xlabel('Tid (timer)')
ax.set_ylabel('Antall tilgjengelige sykler')
ax.set_title('Sykkeltilgjengelighet i løpet av døgnet')
ax.legend()

plt.show()


from matplotlib.widgets import Slider

# Startområde for tid (morgen)
start_tid = [0, 8]  # Viser første 8 timer

# Lag figur og plot
fig, ax = plt.subplots()
plt.subplots_adjust(left=0.1, bottom=0.25)  # Juster plasseringen for skyveknappen

linje1, = ax.plot(tid, stasjon_1, label='Stasjon 1')
linje2, = ax.plot(tid, stasjon_2, label='Stasjon 2')

# Legg til etiketter og tittel
ax.set_xlabel('Tid (timer)')
ax.set_ylabel('Antall tilgjengelige sykler')
ax.set_title('Sykkeltilgjengelighet i løpet av døgnet')
ax.set_xlim(start_tid)

# Lag skyveknapp
axcolor = 'lightgoldenrodyellow'
ax_slider = plt.axes([0.1, 0.1, 0.65, 0.03], facecolor=axcolor)
slider = Slider(ax_slider, 'Tid på dagen', 0, 24, valinit=8, valstep=0.5)  # Trinnstørrelse 0.5 for mer presis kontroll

# Forklaring:
# valinit: Startverdien for skyveknappen (8 timer)
# valstep: Hvor mye verdien endres når du drar skyveknappen (0.5 timer)

# Oppdateringsfunksjon for skyveknappen
def oppdater(val):
    tid_intervall = [val, val + 8]  # Viser 8 timer
    ax.set_xlim(tid_intervall)
    fig.canvas.draw_idle()

# Koble skyveknappen til oppdateringsfunksjonen
slider.on_changed(oppdater)

plt.show()


# Funksjon for å håndtere klikk
def på_klikk(event):
    x = event.xdata  # Tidspunktet som ble klikket på
    y = event.ydata  # Antall sykler på det tidspunktet
    if x and y:  # Sjekk at klikket er innenfor grafen
        tid_klikket = np.round(x, 2)
        # Annoter punktet som ble klikket
        ax.annotate(f'Tid: {tid_klikket:.2f}t\nSykler: {y:.2f}', 
                    (x, y), 
                    textcoords="offset points", 
                    xytext=(10,10), 
                    ha='center', 
                    bbox=dict(boxstyle="round,pad=0.3", edgecolor='black', facecolor='lightblue'))
        fig.canvas.draw_idle()

# Koble klikkhendelsen til figuren
fig.canvas.mpl_connect('button_press_event', på_klikk)

plt.show()
