# Google Shopping Scraper

This Python script allows you to scrape Google Shopping data for specific products based on configurable options. The script retrieves product names, prices, links, suppliers, and delivery options, saving the data in both Excel and JSON formats for easy analysis.

## Features

### 1. `configChanger` - Configure Search Options

The `configChanger` function allows you to set various search options such as:

- **Minimum Price (`ppr_min`)**: Defines the lowest price range for products to filter in the search.
- **Maximum Price (`ppr_max`)**: Sets the upper price limit for product searches.
- **Shipping (`ship`)**: Allows you to specify if the search should include products with free shipping only (`1`) or include all products (`0`).
- **Product Sorting (`p_ord`)**: Sets the sorting order of the products in the search results:
  - **`r`** - Sorts by relevance.
  - **`rv`** - Sorts by review score.
  - **`p`** - Sorts by price, from low to high.
  - **`pd`** - Sorts by price, from high to low.

These options are saved in the `config.ini` file, and users can easily modify them through a simple interactive prompt.

### 2. `ext` - Extract Data

The `ext` function performs the actual scraping based on the search term and configuration. Key steps include:

- **Fetching Search Results**: Sends a GET request to Google Shopping with custom headers to retrieve search results for the product keyword.
- **Parsing HTML Data**: Uses BeautifulSoup to parse the HTML and extract key product information, such as:
  - **Product Name**
  - **Price**
  - **Link to Product**
  - **Supplier**
  - **Delivery Information**
- **Cleaning and Formatting Data**: Processes extracted prices, links, and delivery details, converting prices to integers for easy sorting.

Finally, this function sorts the data by price in ascending order and saves the information in both an Excel file and a JSON file.

### 3. `xl` - Save Data to Excel

The `xl` function generates an Excel file to store the extracted product data in a structured format. Key aspects:

- **File Structure**: The Excel file includes columns for Product Name, Price, Link, Supplier, and Delivery Service.
- **Data Insertion**: Populates rows with product details, providing a well-organized file for users to view and analyze results.
- **File Naming**: Names the Excel file based on the search term, creating a unique file for each search.

## Prerequisites

- Python 3.7 or above
- Packages listed in the `requirements.txt`  file

## Installation

1. Clone the repository:
   
   ```
   https://github.com/aluriDevAnanth/WebScrapingGoogleShopping.git
   ```
2. Navigate to the project directory.
3. Install the required packages:
   
   ```
   pip install -r requirements.txt
   ```

## Usage

1. Open the config.ini file and configure the search options as needed. You can set the minimum price, maximum price, shipping availability, and product sorting.
2. Install the required packages:
   
   ```
   python gs.py
   ```
3. The script will scrape the product information from Google Shopping and save it in both Excel (.xlsx) and JSON (.json) formats. The files will be named based on the search query.
   
   - Excel file: data_<search_query>.xlsx
   - JSON file: data_<search_query>.json

## Contributing

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvements, please create an issue or submit a pull request.

## License

Feel free to customize the content as per your requirements. Make sure to include the appropriate license file (e.g., `LICENSE`) in your repository and update the link in the `README.md` file accordingly.

