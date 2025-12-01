# wsb-prayer-importer

Convert data copied from image taken from Wakstu Sembahyang Brunei Darussalam
whatsapp channel to formatted prayer data supported by WSB

## How to

1. Copy text from image (using OCR)
1. Paste text to [prayer-data/prayer_times.txt](./prayer-data//prayer_times.txt)
1. Run on terminal `deno task start` to start conversion
   - you will be prompted to specify some details (hijri and masihi date)
   - or you can. run
     `deno task start <masihi-month> <masihi-year> <first-hijri-month> <second-hijri-month> <hijri-year>`.
     For example `deno task start 1 2026 Rejab Syaban 1447`
1. Once done, result could be found on
   [prayer-data/prayer-formatted.txt](./prayer-data//prayer-formatted.txt)
   - Please confirm hijri year if there is new year. You will need to manually
     update the hijri year
1. Copy the text and paste to [WSB](wsb.netlify.app/admin)
