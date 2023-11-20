package fundamentals;

import java.util.Scanner;

public class MonthName {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number from 1 to 12: ");
        int monthNumber = scanner.nextInt();
        scanner.close();

        String[] months = {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        if (monthNumber >= 1 && monthNumber <= 12) {
            System.out.println("Months: " + months[monthNumber - 1]);
        } else {
            System.out.println("An incorrect day of the month was entered.");
        }
    }
}