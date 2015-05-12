# filehandler
## Filhanterare byggd med React och Flux (McFly)

Komponenten använder apicom.js som interface mot ett api som förväntas svara på följande metoder, all kommunikation är via POST och kommer med nedan beskrivna JSon objekt som indata.
*  filedata där man skickar ett id på rotkatalogen för filträdet. Ex: {"id":"81726"}
*  movefile som tar målkatalog och vad som ska flyttas. Ex: {"files": ["98761","98712"], "target":"79182"}
*  deletefile som tar id på det som ska tas bort. Ex: {"id":"7612"}

Alla dessa ska returnera ett nytt filträd som svar om det är ok.
Annars ett felmeddelande.
